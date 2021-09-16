// @ts-nocheck

import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getUnitFromValueNode from '../../utils/getUnitFromValueNode.js';
import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import isStandardSyntaxDeclaration from '../../utils/isStandardSyntaxDeclaration.js';
import keywordSets from '../../reference/keywordSets.js';
import _mediaParser from 'postcss-media-query-parser';
const mediaParser = _mediaParser.default;

import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';
import vendor from '../../utils/vendor.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'unit-no-unknown';

const messages = ruleMessages(ruleName, {
	rejected: (unit) => `Unexpected unknown unit "${unit}"`,
});

function rule(actual, options) {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{ actual },
			{
				actual: options,
				possible: {
					ignoreUnits: [isString, isRegExp],
					ignoreFunctions: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		function check(node, value, getIndex) {
			// make sure multiplication operations (*) are divided - not handled
			// by postcss-value-parser
			value = value.replace(/\*/g, ',');
			const parsedValue = valueParser(value);

			parsedValue.walk((valueNode) => {
				// Ignore wrong units within `url` function
				// and within functions listed in the `ignoreFunctions` option
				if (
					valueNode.type === 'function' &&
					(valueNode.value.toLowerCase() === 'url' ||
						optionsMatches(options, 'ignoreFunctions', valueNode.value))
				) {
					return false;
				}

				const unit = getUnitFromValueNode(valueNode);

				if (!unit) {
					return;
				}

				if (optionsMatches(options, 'ignoreUnits', unit)) {
					return;
				}

				if (keywordSets.units.has(unit.toLowerCase()) && unit.toLowerCase() !== 'x') {
					return;
				}

				if (unit.toLowerCase() === 'x') {
					if (
						node.type === 'atrule' &&
						node.name === 'media' &&
						node.params.toLowerCase().includes('resolution')
					) {
						let ignoreUnit = false;

						mediaParser(node.params).walk((mediaNode, i, mediaNodes) => {
							const lastMediaNode = mediaNodes[mediaNodes.length - 1];

							if (
								mediaNode.value.toLowerCase().includes('resolution') &&
								lastMediaNode.sourceIndex === valueNode.sourceIndex
							) {
								ignoreUnit = true;

								return false;
							}
						});

						if (ignoreUnit) {
							return;
						}
					}

					if (node.type === 'decl') {
						if (node.prop.toLowerCase() === 'image-resolution') {
							return;
						}

						if (/^(?:-webkit-)?image-set[\s(]/i.test(value)) {
							const imageSet = parsedValue.nodes.find(
								(n) => vendor.unprefixed(n.value) === 'image-set',
							);
							const imageSetLastNode = imageSet.nodes[imageSet.nodes.length - 1];
							const imageSetValueLastIndex = imageSetLastNode.sourceIndex;

							if (imageSetValueLastIndex >= valueNode.sourceIndex) {
								return;
							}
						}
					}
				}

				report({
					index: getIndex(node) + valueNode.sourceIndex,
					message: messages.rejected(unit),
					node,
					result,
					ruleName,
				});
			});
		}

		root.walkAtRules(/^media$/i, (atRule) => {
			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			check(atRule, atRule.params, atRuleParamIndex);
		});
		root.walkDecls((decl) => {
			if (!isStandardSyntaxDeclaration(decl)) {
				return;
			}

			check(decl, decl.value, declarationValueIndex);
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

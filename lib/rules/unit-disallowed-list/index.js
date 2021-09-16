// @ts-nocheck

import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getUnitFromValueNode from '../../utils/getUnitFromValueNode.js';
import _mediaParser from 'postcss-media-query-parser';
const mediaParser = _mediaParser.default;

import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateObjectWithArrayProps from '../../utils/validateObjectWithArrayProps.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'unit-disallowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (unit) => `Unexpected unit "${unit}"`,
});

// a function to retrieve only the media feature name
// could be externalized in an utils function if needed in other code
const getMediaFeatureName = (mediaFeatureNode) => {
	const value = mediaFeatureNode.value.toLowerCase();

	return /((?:-?\w*)*)/.exec(value)[1];
};

function rule(listInput, options) {
	const list = [].concat(listInput);

	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: list,
				possible: [isString],
			},
			{
				optional: true,
				actual: options,
				possible: {
					ignoreProperties: validateObjectWithArrayProps([isString, isRegExp]),
					ignoreMediaFeatureNames: validateObjectWithArrayProps([isString, isRegExp]),
				},
			},
		);

		if (!validOptions) {
			return;
		}

		function check(node, nodeIndex, valueNode, input, option) {
			const unit = getUnitFromValueNode(valueNode);

			// There is not unit or it is not configured as a violation
			if (!unit || (unit && !list.includes(unit.toLowerCase()))) {
				return;
			}

			// The unit has an ignore option for the specific input
			if (optionsMatches(option, unit.toLowerCase(), input)) {
				return;
			}

			report({
				index: nodeIndex + valueNode.sourceIndex,
				message: messages.rejected(unit),
				node,
				result,
				ruleName,
			});
		}

		function checkMedia(node, value, getIndex) {
			mediaParser(node.params).walk(/^media-feature$/i, (mediaFeatureNode) => {
				const mediaName = getMediaFeatureName(mediaFeatureNode);
				const parentValue = mediaFeatureNode.parent.value;

				valueParser(value).walk((valueNode) => {
					// Ignore all non-word valueNode and
					// the values not included in the parentValue string
					if (valueNode.type !== 'word' || !parentValue.includes(valueNode.value)) {
						return;
					}

					check(
						node,
						getIndex(node),
						valueNode,
						mediaName,
						options ? options.ignoreMediaFeatureNames : {},
					);
				});
			});
		}

		function checkDecl(node, value, getIndex) {
			// make sure multiplication operations (*) are divided - not handled
			// by postcss-value-parser
			value = value.replace(/\*/g, ',');

			valueParser(value).walk((valueNode) => {
				// Ignore wrong units within `url` function
				if (valueNode.type === 'function' && valueNode.value.toLowerCase() === 'url') {
					return false;
				}

				check(node, getIndex(node), valueNode, node.prop, options ? options.ignoreProperties : {});
			});
		}

		root.walkAtRules(/^media$/i, (atRule) => checkMedia(atRule, atRule.params, atRuleParamIndex));
		root.walkDecls((decl) => checkDecl(decl, decl.value, declarationValueIndex));
	};
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

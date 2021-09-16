// @ts-nocheck

import isContextFunctionalPseudoClass from '../../utils/isContextFunctionalPseudoClass.js';
import isNonNegativeInteger from '../../utils/isNonNegativeInteger.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import optionsMatches from '../../utils/optionsMatches.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import resolvedNestedSelector from 'postcss-resolve-nested-selector';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-max-attribute';

const messages = ruleMessages(ruleName, {
	expected: (selector, max) =>
		`Expected "${selector}" to have no more than ${max} attribute ${
			max === 1 ? 'selector' : 'selectors'
		}`,
});

function rule(max, options) {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: max,
				possible: isNonNegativeInteger,
			},
			{
				actual: options,
				possible: {
					ignoreAttributes: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		function checkSelector(selectorNode, ruleNode) {
			const count = selectorNode.reduce((total, childNode) => {
				// Only traverse inside actual selectors and context functional pseudo-classes
				if (childNode.type === 'selector' || isContextFunctionalPseudoClass(childNode)) {
					checkSelector(childNode, ruleNode);
				}

				if (childNode.type !== 'attribute') {
					// Not an attribute node -> ignore
					return total;
				}

				if (optionsMatches(options, 'ignoreAttributes', childNode.attribute)) {
					// it's an attribute that is supposed to be ignored
					return total;
				}

				return (total += 1);
			}, 0);

			if (selectorNode.type !== 'root' && selectorNode.type !== 'pseudo' && count > max) {
				report({
					ruleName,
					result,
					node: ruleNode,
					message: messages.expected(selectorNode, max),
					word: selectorNode,
				});
			}
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			ruleNode.selectors.forEach((selector) => {
				resolvedNestedSelector(selector, ruleNode).forEach((resolvedSelector) => {
					parseSelector(resolvedSelector, result, ruleNode, (container) =>
						checkSelector(container, ruleNode),
					);
				});
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

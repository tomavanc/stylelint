// @ts-nocheck

import isNonNegativeInteger from '../../utils/isNonNegativeInteger.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import resolvedNestedSelector from 'postcss-resolve-nested-selector';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'selector-max-combinators';

const messages = ruleMessages(ruleName, {
	expected: (selector, max) =>
		`Expected "${selector}" to have no more than ${max} ${
			max === 1 ? 'combinator' : 'combinators'
		}`,
});

function rule(max) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: max,
			possible: isNonNegativeInteger,
		});

		if (!validOptions) {
			return;
		}

		function checkSelector(selectorNode, ruleNode) {
			const count = selectorNode.reduce((total, childNode) => {
				// Only traverse inside actual selectors
				if (childNode.type === 'selector') {
					checkSelector(childNode, ruleNode);
				}

				return (total += childNode.type === 'combinator' ? 1 : 0);
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

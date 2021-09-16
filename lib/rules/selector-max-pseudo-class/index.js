// @ts-nocheck

import isContextFunctionalPseudoClass from '../../utils/isContextFunctionalPseudoClass.js';
import isNonNegativeInteger from '../../utils/isNonNegativeInteger.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import keywordSets from '../../reference/keywordSets.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import resolvedNestedSelector from 'postcss-resolve-nested-selector';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'selector-max-pseudo-class';

const messages = ruleMessages(ruleName, {
	expected: (selector, max) =>
		`Expected "${selector}" to have no more than ${max} pseudo-${max === 1 ? 'class' : 'classes'}`,
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
				// Only traverse inside actual selectors and context functional pseudo-classes
				if (childNode.type === 'selector' || isContextFunctionalPseudoClass(childNode)) {
					checkSelector(childNode, ruleNode);
				}

				// Exclude pseudo elements from the count
				if (
					childNode.type === 'pseudo' &&
					(childNode.value.includes('::') ||
						keywordSets.levelOneAndTwoPseudoElements.has(childNode.value.toLowerCase().slice(1)))
				) {
					return total;
				}

				if (childNode.type === 'pseudo') {
					return (total += 1);
				}

				return total;
			}, 0);

			if (count > max) {
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
					parseSelector(resolvedSelector, result, rule, (selectorTree) => {
						checkSelector(selectorTree, ruleNode);
					});
				});
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

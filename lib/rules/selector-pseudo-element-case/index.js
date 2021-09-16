// @ts-nocheck

import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import isStandardSyntaxSelector from '../../utils/isStandardSyntaxSelector.js';
import keywordSets from '../../reference/keywordSets.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import transformSelector from '../../utils/transformSelector.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'selector-pseudo-element-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
});

function rule(expectation, options, context) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: expectation,
			possible: ['lower', 'upper'],
		});

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selector = ruleNode.selector;

			if (!selector.includes(':')) {
				return;
			}

			transformSelector(result, ruleNode, (selectorTree) => {
				selectorTree.walkPseudos((pseudoNode) => {
					const pseudoElement = pseudoNode.value;

					if (!isStandardSyntaxSelector(pseudoElement)) {
						return;
					}

					if (
						!pseudoElement.includes('::') &&
						!keywordSets.levelOneAndTwoPseudoElements.has(pseudoElement.toLowerCase().slice(1))
					) {
						return;
					}

					const expectedPseudoElement =
						expectation === 'lower' ? pseudoElement.toLowerCase() : pseudoElement.toUpperCase();

					if (pseudoElement === expectedPseudoElement) {
						return;
					}

					if (context.fix) {
						pseudoNode.value = expectedPseudoElement;

						return;
					}

					report({
						message: messages.expected(pseudoElement, expectedPseudoElement),
						node: ruleNode,
						index: pseudoNode.sourceIndex,
						ruleName,
						result,
					});
				});
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

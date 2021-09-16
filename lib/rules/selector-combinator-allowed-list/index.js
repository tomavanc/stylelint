// @ts-nocheck

import isStandardSyntaxCombinator from '../../utils/isStandardSyntaxCombinator.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-combinator-allowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (combinator) => `Unexpected combinator "${combinator}"`,
});

function rule(list) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: list,
			possible: [isString],
		});

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selector = ruleNode.selector;

			parseSelector(selector, result, ruleNode, (fullSelector) => {
				fullSelector.walkCombinators((combinatorNode) => {
					if (!isStandardSyntaxCombinator(combinatorNode)) {
						return;
					}

					const value = normalizeCombinator(combinatorNode.value);

					if (list.includes(value)) {
						return;
					}

					report({
						result,
						ruleName,
						message: messages.rejected(value),
						node: ruleNode,
						index: combinatorNode.sourceIndex,
					});
				});
			});
		});
	};
}

function normalizeCombinator(value) {
	return value.replace(/\s+/g, ' ');
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

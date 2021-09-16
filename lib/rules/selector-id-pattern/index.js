// @ts-nocheck

import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-id-pattern';

const messages = ruleMessages(ruleName, {
	expected: (selectorValue, pattern) =>
		`Expected ID selector "#${selectorValue}" to match pattern "${pattern}"`,
});

function rule(pattern) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: pattern,
			possible: [isRegExp, isString],
		});

		if (!validOptions) {
			return;
		}

		const normalizedPattern = isString(pattern) ? new RegExp(pattern) : pattern;

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selector = ruleNode.selector;

			parseSelector(selector, result, ruleNode, (fullSelector) => {
				fullSelector.walk((selectorNode) => {
					if (selectorNode.type !== 'id') {
						return;
					}

					const value = selectorNode.value;
					const sourceIndex = selectorNode.sourceIndex;

					if (normalizedPattern.test(value)) {
						return;
					}

					report({
						result,
						ruleName,
						message: messages.expected(value, pattern),
						node: ruleNode,
						index: sourceIndex,
					});
				});
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

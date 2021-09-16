// @ts-nocheck

import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-nested-pattern';

const messages = ruleMessages(ruleName, {
	expected: (selector, pattern) =>
		`Expected nested selector "${selector}" to match pattern "${pattern}"`,
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
			if (ruleNode.parent.type !== 'rule') {
				return;
			}

			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selector = ruleNode.selector;

			if (normalizedPattern.test(selector)) {
				return;
			}

			report({
				result,
				ruleName,
				message: messages.expected(selector, pattern),
				node: ruleNode,
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

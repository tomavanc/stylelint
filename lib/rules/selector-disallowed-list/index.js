// @ts-nocheck

import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-disallowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (selector) => `Unexpected selector "${selector}"`,
});

function rule(listInput) {
	const list = [].concat(listInput);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: list,
			possible: [isString, isRegExp],
		});

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selector = ruleNode.selector;

			if (!matchesStringOrRegExp(selector, list)) {
				return;
			}

			report({
				result,
				ruleName,
				message: messages.rejected(selector),
				node: ruleNode,
			});
		});
	};
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

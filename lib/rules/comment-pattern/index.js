import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'comment-pattern';

const messages = ruleMessages(ruleName, {
	expected: (pattern) => `Expected comment to match pattern "${pattern}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isRegExp, isString],
		});

		if (!validOptions) {
			return;
		}

		const normalizedPattern = isString(primary) ? new RegExp(primary) : primary;

		root.walkComments((comment) => {
			const text = comment.text;

			if (normalizedPattern.test(text)) {
				return;
			}

			report({
				message: messages.expected(primary),
				node: comment,
				result,
				ruleName,
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

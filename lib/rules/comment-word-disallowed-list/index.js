import containsString from '../../utils/containsString.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'comment-word-disallowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (pattern) => `Unexpected word matching pattern "${pattern}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isString, isRegExp],
		});

		if (!validOptions) {
			return;
		}

		root.walkComments((comment) => {
			const text = comment.text;
			const rawComment = comment.toString();
			const firstFourChars = rawComment.substr(0, 4);

			// Return early if sourcemap
			if (firstFourChars === '/*# ') {
				return;
			}

			const matchesWord = matchesStringOrRegExp(text, primary) || containsString(text, primary);

			if (!matchesWord) {
				return;
			}

			report({
				message: messages.rejected(matchesWord.pattern),
				node: comment,
				result,
				ruleName,
			});
		});
	};
};

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

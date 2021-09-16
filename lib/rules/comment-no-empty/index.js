import isStandardSyntaxComment from '../../utils/isStandardSyntaxComment.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'comment-no-empty';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected empty comment',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) {
			return;
		}

		root.walkComments((comment) => {
			// To ignore non-standard comments
			if (!isStandardSyntaxComment(comment)) {
				return;
			}

			// To ignore comments that are not empty
			if (comment.text && comment.text.length !== 0) {
				return;
			}

			report({
				message: messages.rejected,
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

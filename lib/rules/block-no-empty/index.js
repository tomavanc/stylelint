import beforeBlockString from '../../utils/beforeBlockString.js';
import hasBlock from '../../utils/hasBlock.js';
import hasEmptyBlock from '../../utils/hasEmptyBlock.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isBoolean } from '../../utils/validateTypes.js';

const ruleName = 'block-no-empty';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected empty block',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, secondaryOptions) => {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: isBoolean,
			},
			{
				actual: secondaryOptions,
				possible: {
					ignore: ['comments'],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		const ignoreComments = optionsMatches(secondaryOptions, 'ignore', 'comments');

		// Check both kinds of statements: rules and at-rules
		root.walkRules(check);
		root.walkAtRules(check);

		/**
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement
		 */
		function check(statement) {
			if (!hasEmptyBlock(statement) && !ignoreComments) {
				return;
			}

			if (!hasBlock(statement)) {
				return;
			}

			const hasCommentsOnly = statement.nodes.every((node) => node.type === 'comment');

			if (!hasCommentsOnly) {
				return;
			}

			let index = beforeBlockString(statement, { noRawBefore: true }).length;

			// For empty blocks when using SugarSS parser
			if (statement.raws.between === undefined) {
				index--;
			}

			report({
				message: messages.rejected,
				node: statement,
				index,
				result,
				ruleName,
			});
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

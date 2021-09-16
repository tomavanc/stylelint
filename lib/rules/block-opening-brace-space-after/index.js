import beforeBlockString from '../../utils/beforeBlockString.js';
import blockString from '../../utils/blockString.js';
import hasBlock from '../../utils/hasBlock.js';
import hasEmptyBlock from '../../utils/hasEmptyBlock.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import whitespaceChecker from '../../utils/whitespaceChecker.js';

const ruleName = 'block-opening-brace-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected single space after "{"',
	rejectedAfter: () => 'Unexpected whitespace after "{"',
	expectedAfterSingleLine: () => 'Expected single space after "{" of a single-line block',
	rejectedAfterSingleLine: () => 'Unexpected whitespace after "{" of a single-line block',
	expectedAfterMultiLine: () => 'Expected single space after "{" of a multi-line block',
	rejectedAfterMultiLine: () => 'Unexpected whitespace after "{" of a multi-line block',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [
				'always',
				'never',
				'always-single-line',
				'never-single-line',
				'always-multi-line',
				'never-multi-line',
			],
		});

		if (!validOptions) {
			return;
		}

		// Check both kinds of statements: rules and at-rules
		root.walkRules(check);
		root.walkAtRules(check);

		/**
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement
		 */
		function check(statement) {
			// Return early if blockless or has an empty block
			if (!hasBlock(statement) || hasEmptyBlock(statement)) {
				return;
			}

			checker.after({
				source: blockString(statement),
				index: 0,
				err: (m) => {
					if (context.fix) {
						const statementFirst = statement.first;

						if (statementFirst == null) return;

						if (primary.startsWith('always')) {
							statementFirst.raws.before = ' ';

							return;
						}

						if (primary.startsWith('never')) {
							statementFirst.raws.before = '';

							return;
						}
					}

					report({
						message: m,
						node: statement,
						index: beforeBlockString(statement, { noRawBefore: true }).length + 1,
						result,
						ruleName,
					});
				},
			});
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

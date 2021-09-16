import mediaQueryListCommaWhitespaceChecker from '../mediaQueryListCommaWhitespaceChecker.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import whitespaceChecker from '../../utils/whitespaceChecker.js';

const ruleName = 'media-query-list-comma-newline-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected newline before ","',
	expectedBeforeMultiLine: () => 'Expected newline before "," in a multi-line list',
	rejectedBeforeMultiLine: () => 'Unexpected whitespace before "," in a multi-line list',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'always-multi-line', 'never-multi-line'],
		});

		if (!validOptions) {
			return;
		}

		mediaQueryListCommaWhitespaceChecker({
			root,
			result,
			locationChecker: checker.beforeAllowingIndentation,
			checkedRuleName: ruleName,
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

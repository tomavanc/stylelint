import fixer from '../functionCommaSpaceFix.js';
import functionCommaSpaceChecker from '../functionCommaSpaceChecker.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import whitespaceChecker from '../../utils/whitespaceChecker.js';

const ruleName = 'function-comma-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ","',
	rejectedBefore: () => 'Unexpected whitespace before ","',
	expectedBeforeSingleLine: () => 'Expected single space before "," in a single-line function',
	rejectedBeforeSingleLine: () => 'Unexpected whitespace before "," in a single-line function',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never', 'always-single-line', 'never-single-line'],
		});

		if (!validOptions) {
			return;
		}

		functionCommaSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: context.fix
				? (div, index, nodes) => {
						return fixer({
							div,
							index,
							nodes,
							expectation: primary,
							position: 'before',
							symb: ' ',
						});
				  }
				: null,
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

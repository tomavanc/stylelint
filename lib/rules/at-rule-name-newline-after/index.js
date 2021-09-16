import atRuleNameSpaceChecker from '../atRuleNameSpaceChecker.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import whitespaceChecker from '../../utils/whitespaceChecker.js';

const ruleName = 'at-rule-name-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: (name) => `Expected newline after at-rule name "${name}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'always-multi-line'],
		});

		if (!validOptions) {
			return;
		}

		atRuleNameSpaceChecker({
			root,
			result,
			locationChecker: checker.afterOneOnly,
			checkedRuleName: ruleName,
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

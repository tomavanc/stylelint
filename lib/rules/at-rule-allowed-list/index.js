import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isString } from '../../utils/validateTypes.js';

const ruleName = 'at-rule-allowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (name) => `Unexpected at-rule "${name}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	// To allow for just a string as a parameter (not only arrays of strings)
	const primaryValues = [primary].flat();

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primaryValues,
			possible: [isString],
		});

		if (!validOptions) {
			return;
		}

		/** @type {string[]} */
		const atRuleNames = primaryValues;

		root.walkAtRules((atRule) => {
			const name = atRule.name;

			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			if (atRuleNames.includes(vendor.unprefixed(name).toLowerCase())) {
				return;
			}

			report({
				message: messages.rejected(name),
				node: atRule,
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

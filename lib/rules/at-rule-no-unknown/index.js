import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import keywordSets from '../../reference/keywordSets.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'at-rule-no-unknown';

const messages = ruleMessages(ruleName, {
	rejected: (atRule) => `Unexpected unknown at-rule "${atRule}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, secondaryOptions) => {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{ actual: primary },
			{
				actual: secondaryOptions,
				possible: {
					ignoreAtRules: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkAtRules((atRule) => {
			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			const name = atRule.name;

			// Return early if at-rule is to be ignored
			if (optionsMatches(secondaryOptions, 'ignoreAtRules', atRule.name)) {
				return;
			}

			if (vendor.prefix(name) || keywordSets.atRules.has(name.toLowerCase())) {
				return;
			}

			report({
				message: messages.rejected(`@${name}`),
				node: atRule,
				ruleName,
				result,
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

import isAutoprefixable from '../../utils/isAutoprefixable.js';
import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'at-rule-no-vendor-prefix';

const messages = ruleMessages(ruleName, {
	rejected: (p) => `Unexpected vendor-prefixed at-rule "@${p}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, _secondary, context) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) {
			return;
		}

		root.walkAtRules((atRule) => {
			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			const name = atRule.name;

			if (!name.startsWith('-')) {
				return;
			}

			if (!isAutoprefixable.atRuleName(name)) {
				return;
			}

			if (context.fix) {
				atRule.name = isAutoprefixable.unprefix(atRule.name);

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

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

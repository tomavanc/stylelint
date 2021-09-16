import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'custom-media-pattern';

const messages = ruleMessages(ruleName, {
	expected: (pattern) => `Expected custom media query name to match pattern "${pattern}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isRegExp, isString],
		});

		if (!validOptions) {
			return;
		}

		const regexpPattern = isString(primary) ? new RegExp(primary) : primary;

		root.walkAtRules((atRule) => {
			if (atRule.name.toLowerCase() !== 'custom-media') {
				return;
			}

			const match = atRule.params.match(/^--(\S+)\b/);

			if (match == null) throw new Error(`Unexpected at-rule params: "${atRule.params}"`);

			const customMediaName = match[1];

			if (regexpPattern.test(customMediaName)) {
				return;
			}

			report({
				message: messages.expected(primary),
				node: atRule,
				index: atRuleParamIndex(atRule),
				result,
				ruleName,
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

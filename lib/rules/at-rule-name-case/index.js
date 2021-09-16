import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'at-rule-name-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, _secondary, context) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['lower', 'upper'],
		});

		if (!validOptions) {
			return;
		}

		/** @type {'lower' | 'upper'} */
		const expectation = primary;

		root.walkAtRules((atRule) => {
			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			const name = atRule.name;

			const expectedName = expectation === 'lower' ? name.toLowerCase() : name.toUpperCase();

			if (name === expectedName) {
				return;
			}

			if (context.fix) {
				atRule.name = expectedName;

				return;
			}

			report({
				message: messages.expected(name, expectedName),
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

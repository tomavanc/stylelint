import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isPlainObject } from 'is-plain-object';

const ruleName = 'at-rule-property-required-list';

const messages = ruleMessages(ruleName, {
	expected: (property, atRule) => `Expected property "${property}" for at-rule "${atRule}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isPlainObject],
		});

		if (!validOptions) {
			return;
		}

		/** @type {Record<string, string[]>} */
		const list = primary;

		root.walkAtRules((atRule) => {
			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			const { name, nodes } = atRule;
			const atRuleName = name.toLowerCase();

			if (!list[atRuleName]) {
				return;
			}

			list[atRuleName].forEach((property) => {
				const propertyName = property.toLowerCase();

				const hasProperty = nodes.find(
					(node) => node.type === 'decl' && node.prop.toLowerCase() === propertyName,
				);

				if (hasProperty) {
					return;
				}

				return report({
					message: messages.expected(propertyName, atRuleName),
					node: atRule,
					result,
					ruleName,
				});
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;

export default rule;

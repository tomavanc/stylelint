// @ts-nocheck

import isCustomProperty from '../../utils/isCustomProperty.js';
import isStandardSyntaxProperty from '../../utils/isStandardSyntaxProperty.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'property-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
});

function rule(expectation, options, context) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: expectation,
			possible: ['lower', 'upper'],
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			const prop = decl.prop;

			if (!isStandardSyntaxProperty(prop)) {
				return;
			}

			if (isCustomProperty(prop)) {
				return;
			}

			const expectedProp = expectation === 'lower' ? prop.toLowerCase() : prop.toUpperCase();

			if (prop === expectedProp) {
				return;
			}

			if (context.fix) {
				decl.prop = expectedProp;

				return;
			}

			report({
				message: messages.expected(prop, expectedProp),
				node: decl,
				ruleName,
				result,
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

import hasBlock from '../../utils/hasBlock.js';
import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import rawNodeString from '../../utils/rawNodeString.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import whitespaceChecker from '../../utils/whitespaceChecker.js';

const ruleName = 'at-rule-semicolon-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ";"',
	rejectedBefore: () => 'Unexpected whitespace before ";"',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never'],
		});

		if (!validOptions) {
			return;
		}

		root.walkAtRules((atRule) => {
			if (hasBlock(atRule)) {
				return;
			}

			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			const nodeString = rawNodeString(atRule);

			checker.before({
				source: nodeString,
				index: nodeString.length,
				err: (m) => {
					report({
						message: m,
						node: atRule,
						index: nodeString.length - 1,
						result,
						ruleName,
					});
				},
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

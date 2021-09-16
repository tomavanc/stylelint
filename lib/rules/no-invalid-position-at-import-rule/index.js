// @ts-nocheck

import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'no-invalid-position-at-import-rule';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected invalid position @import rule',
});

function rule(actual, options) {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{ actual },
			{
				actual: options,
				possible: {
					ignoreAtRules: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		let invalidPosition = false;

		root.walk((node) => {
			const nodeName = node.name && node.name.toLowerCase();

			if (
				(node.type === 'atrule' &&
					nodeName !== 'charset' &&
					nodeName !== 'import' &&
					!optionsMatches(options, 'ignoreAtRules', node.name) &&
					isStandardSyntaxAtRule(node)) ||
				(node.type === 'rule' && isStandardSyntaxRule(node))
			) {
				invalidPosition = true;

				return;
			}

			if (node.type === 'atrule' && nodeName === 'import') {
				if (invalidPosition) {
					report({
						message: messages.rejected,
						node,
						result,
						ruleName,
					});
				}
			}
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

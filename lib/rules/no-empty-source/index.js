// @ts-nocheck

import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'no-empty-source';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected empty source',
});

function rule(actual, options, context) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual });

		if (!validOptions) {
			return;
		}

		const rootString = context.fix ? root.toString() : root.source.input.css;

		if (rootString.trim()) {
			return;
		}

		report({
			message: messages.rejected,
			node: root,
			result,
			ruleName,
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

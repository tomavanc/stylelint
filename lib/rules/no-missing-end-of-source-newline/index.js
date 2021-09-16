// @ts-nocheck

import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'no-missing-end-of-source-newline';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected missing end-of-source newline',
});

function rule(primary, _, context) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { primary });

		if (!validOptions) {
			return;
		}

		if (root.source.inline || root.source.lang === 'object-literal') {
			return;
		}

		const rootString = context.fix ? root.toString() : root.source.input.css;

		if (!rootString.trim() || rootString.endsWith('\n')) {
			return;
		}

		// Fix
		if (context.fix) {
			root.raws.after = context.newline;

			return;
		}

		report({
			message: messages.rejected,
			node: root,
			index: rootString.length - 1,
			result,
			ruleName,
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

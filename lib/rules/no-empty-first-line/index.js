// @ts-nocheck

import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'no-empty-first-line';
const noEmptyFirstLineTest = /^\s*[\r\n]/;

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected empty line',
});

function rule(actual, _, context) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual });

		if (!validOptions || root.source.inline || root.source.lang === 'object-literal') {
			return;
		}

		const rootString = context.fix ? root.toString() : root.source.input.css;

		if (!rootString.trim()) {
			return;
		}

		if (noEmptyFirstLineTest.test(rootString)) {
			if (context.fix) {
				root.nodes[0].raws.before = root.first.raws.before.trimStart();

				return;
			}

			report({
				message: messages.rejected,
				node: root,
				result,
				ruleName,
			});
		}
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

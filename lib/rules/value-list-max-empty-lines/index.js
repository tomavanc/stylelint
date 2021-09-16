// @ts-nocheck

import getDeclarationValue from '../../utils/getDeclarationValue.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import setDeclarationValue from '../../utils/setDeclarationValue.js';
import validateOptions from '../../utils/validateOptions.js';
import { isNumber } from '../../utils/validateTypes.js';

const ruleName = 'value-list-max-empty-lines';

const messages = ruleMessages(ruleName, {
	expected: (max) => `Expected no more than ${max} empty ${max === 1 ? 'line' : 'lines'}`,
});

function rule(max, options, context) {
	const maxAdjacentNewlines = max + 1;

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: max,
			possible: isNumber,
		});

		if (!validOptions) {
			return;
		}

		const violatedCRLFNewLinesRegex = new RegExp(`(?:\r\n){${maxAdjacentNewlines + 1},}`);
		const violatedLFNewLinesRegex = new RegExp(`\n{${maxAdjacentNewlines + 1},}`);
		const allowedLFNewLinesString = context.fix ? '\n'.repeat(maxAdjacentNewlines) : '';
		const allowedCRLFNewLinesString = context.fix ? '\r\n'.repeat(maxAdjacentNewlines) : '';

		root.walkDecls((decl) => {
			const value = getDeclarationValue(decl);

			if (context.fix) {
				const newValueString = value
					.replace(new RegExp(violatedLFNewLinesRegex, 'gm'), allowedLFNewLinesString)
					.replace(new RegExp(violatedCRLFNewLinesRegex, 'gm'), allowedCRLFNewLinesString);

				setDeclarationValue(decl, newValueString);
			} else if (violatedLFNewLinesRegex.test(value) || violatedCRLFNewLinesRegex.test(value)) {
				report({
					message: messages.expected(max),
					node: decl,
					index: 0,
					result,
					ruleName,
				});
			}
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

// @ts-nocheck

import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getDeclarationValue from '../../utils/getDeclarationValue.js';
import ruleMessages from '../../utils/ruleMessages.js';
import setDeclarationValue from '../../utils/setDeclarationValue.js';
import validateOptions from '../../utils/validateOptions.js';
import valueListCommaWhitespaceChecker from '../valueListCommaWhitespaceChecker.js';
import whitespaceChecker from '../../utils/whitespaceChecker.js';

const ruleName = 'value-list-comma-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ","',
	rejectedBefore: () => 'Unexpected whitespace before ","',
	expectedBeforeSingleLine: () => 'Unexpected whitespace before "," in a single-line list',
	rejectedBeforeSingleLine: () => 'Unexpected whitespace before "," in a single-line list',
});

function rule(expectation, options, context) {
	const checker = whitespaceChecker('space', expectation, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: expectation,
			possible: ['always', 'never', 'always-single-line', 'never-single-line'],
		});

		if (!validOptions) {
			return;
		}

		let fixData;

		valueListCommaWhitespaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: context.fix
				? (declNode, index) => {
						const valueIndex = declarationValueIndex(declNode);

						if (index <= valueIndex) {
							return false;
						}

						fixData = fixData || new Map();
						const commaIndices = fixData.get(declNode) || [];

						commaIndices.push(index);
						fixData.set(declNode, commaIndices);

						return true;
				  }
				: null,
		});

		if (fixData) {
			fixData.forEach((commaIndices, decl) => {
				commaIndices
					.sort((a, b) => b - a)
					.forEach((index) => {
						const value = getDeclarationValue(decl);
						const valueIndex = index - declarationValueIndex(decl);
						let beforeValue = value.slice(0, valueIndex);
						const afterValue = value.slice(valueIndex);

						if (expectation.startsWith('always')) {
							beforeValue = beforeValue.replace(/\s*$/, ' ');
						} else if (expectation.startsWith('never')) {
							beforeValue = beforeValue.replace(/\s*$/, '');
						}

						setDeclarationValue(decl, beforeValue + afterValue);
					});
			});
		}
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

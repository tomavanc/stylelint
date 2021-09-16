// @ts-nocheck

import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getDeclarationValue from '../../utils/getDeclarationValue.js';
import ruleMessages from '../../utils/ruleMessages.js';
import setDeclarationValue from '../../utils/setDeclarationValue.js';
import validateOptions from '../../utils/validateOptions.js';
import valueListCommaWhitespaceChecker from '../valueListCommaWhitespaceChecker.js';
import whitespaceChecker from '../../utils/whitespaceChecker.js';

const ruleName = 'value-list-comma-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected single space after ","',
	rejectedAfter: () => 'Unexpected whitespace after ","',
	expectedAfterSingleLine: () => 'Expected single space after "," in a single-line list',
	rejectedAfterSingleLine: () => 'Unexpected whitespace after "," in a single-line list',
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
			locationChecker: checker.after,
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
						const beforeValue = value.slice(0, valueIndex + 1);
						let afterValue = value.slice(valueIndex + 1);

						if (expectation.startsWith('always')) {
							afterValue = afterValue.replace(/^\s*/, ' ');
						} else if (expectation.startsWith('never')) {
							afterValue = afterValue.replace(/^\s*/, '');
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

import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getDeclarationValue from '../../utils/getDeclarationValue.js';
import isStandardSyntaxFunction from '../../utils/isStandardSyntaxFunction.js';
import keywordSets from '../../reference/keywordSets.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import setDeclarationValue from '../../utils/setDeclarationValue.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'function-name-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`,
});

const mapLowercaseFunctionNamesToCamelCase = new Map();

keywordSets.camelCaseFunctionNames.forEach((func) => {
	mapLowercaseFunctionNamesToCamelCase.set(func.toLowerCase(), func);
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, secondaryOptions, context) => {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: ['lower', 'upper'],
			},
			{
				actual: secondaryOptions,
				possible: {
					ignoreFunctions: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			let needFix = false;
			const parsed = valueParser(getDeclarationValue(decl));

			parsed.walk((node) => {
				if (node.type !== 'function' || !isStandardSyntaxFunction(node)) {
					return;
				}

				const functionName = node.value;
				const functionNameLowerCase = functionName.toLowerCase();

				const ignoreFunctions = (secondaryOptions && secondaryOptions.ignoreFunctions) || [];

				if (ignoreFunctions.length > 0 && matchesStringOrRegExp(functionName, ignoreFunctions)) {
					return;
				}

				let expectedFunctionName = null;

				if (
					primary === 'lower' &&
					mapLowercaseFunctionNamesToCamelCase.has(functionNameLowerCase)
				) {
					expectedFunctionName = mapLowercaseFunctionNamesToCamelCase.get(functionNameLowerCase);
				} else if (primary === 'lower') {
					expectedFunctionName = functionNameLowerCase;
				} else {
					expectedFunctionName = functionName.toUpperCase();
				}

				if (functionName === expectedFunctionName) {
					return;
				}

				if (context.fix) {
					needFix = true;
					node.value = expectedFunctionName;

					return;
				}

				report({
					message: messages.expected(functionName, expectedFunctionName),
					node: decl,
					index: declarationValueIndex(decl) + node.sourceIndex,
					result,
					ruleName,
				});
			});

			if (context.fix && needFix) {
				setDeclarationValue(decl, parsed.toString());
			}
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

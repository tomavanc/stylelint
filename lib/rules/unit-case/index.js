// @ts-nocheck

import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getUnitFromValueNode from '../../utils/getUnitFromValueNode.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';

const ruleName = 'unit-case';

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

		function check(node, checkedValue, getIndex) {
			const violations = [];

			function processValue(valueNode) {
				const unit = getUnitFromValueNode(valueNode);

				if (!unit) {
					return false;
				}

				const expectedUnit = expectation === 'lower' ? unit.toLowerCase() : unit.toUpperCase();

				if (unit === expectedUnit) {
					return false;
				}

				violations.push({
					index: getIndex(node) + valueNode.sourceIndex,
					message: messages.expected(unit, expectedUnit),
				});

				return true;
			}

			const parsedValue = valueParser(checkedValue).walk((valueNode) => {
				// Ignore wrong units within `url` function
				let needFix = false;
				const value = valueNode.value;

				if (valueNode.type === 'function' && value.toLowerCase() === 'url') {
					return false;
				}

				if (value.includes('*')) {
					value.split('*').some((val) => {
						return processValue({
							...valueNode,
							sourceIndex: value.indexOf(val) + val.length + 1,
							value: val,
						});
					});
				}

				needFix = processValue(valueNode);

				if (needFix && context.fix) {
					valueNode.value = expectation === 'lower' ? value.toLowerCase() : value.toUpperCase();
				}
			});

			if (violations.length) {
				if (context.fix) {
					if (node.name === 'media') {
						node.params = parsedValue.toString();
					} else {
						node.value = parsedValue.toString();
					}
				} else {
					violations.forEach((err) => {
						report({
							index: err.index,
							message: err.message,
							node,
							result,
							ruleName,
						});
					});
				}
			}
		}

		root.walkAtRules((atRule) => {
			if (!/^media$/i.test(atRule.name) && !atRule.variable) {
				return;
			}

			check(atRule, atRule.params, atRuleParamIndex);
		});
		root.walkDecls((decl) => check(decl, decl.value, declarationValueIndex));
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

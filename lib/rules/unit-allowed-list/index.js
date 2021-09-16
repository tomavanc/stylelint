// @ts-nocheck

import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getUnitFromValueNode from '../../utils/getUnitFromValueNode.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateObjectWithArrayProps from '../../utils/validateObjectWithArrayProps.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'unit-allowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (unit) => `Unexpected unit "${unit}"`,
});

function rule(listInput, options) {
	const list = [].concat(listInput);

	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: list,
				possible: [isString],
			},
			{
				optional: true,
				actual: options,
				possible: {
					ignoreProperties: validateObjectWithArrayProps([isString, isRegExp]),
				},
			},
		);

		if (!validOptions) {
			return;
		}

		function check(node, value, getIndex) {
			// make sure multiplication operations (*) are divided - not handled
			// by postcss-value-parser
			value = value.replace(/\*/g, ',');
			valueParser(value).walk((valueNode) => {
				// Ignore wrong units within `url` function
				if (valueNode.type === 'function' && valueNode.value.toLowerCase() === 'url') {
					return false;
				}

				const unit = getUnitFromValueNode(valueNode);

				if (!unit || (unit && list.includes(unit.toLowerCase()))) {
					return;
				}

				if (options && optionsMatches(options.ignoreProperties, unit.toLowerCase(), node.prop)) {
					return;
				}

				report({
					index: getIndex(node) + valueNode.sourceIndex,
					message: messages.rejected(unit),
					node,
					result,
					ruleName,
				});
			});
		}

		root.walkAtRules(/^media$/i, (atRule) => check(atRule, atRule.params, atRuleParamIndex));
		root.walkDecls((decl) => check(decl, decl.value, declarationValueIndex));
	};
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

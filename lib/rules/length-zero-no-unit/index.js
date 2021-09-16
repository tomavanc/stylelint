import valueParser from 'postcss-value-parser';

import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getAtRuleParams from '../../utils/getAtRuleParams.js';
import getDeclarationValue from '../../utils/getDeclarationValue.js';
import isCustomProperty from '../../utils/isCustomProperty.js';
import isMathFunction from '../../utils/isMathFunction.js';
import isStandardSyntaxAtRule from '../../utils/isStandardSyntaxAtRule.js';
import keywordSets from '../../reference/keywordSets.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import setAtRuleParams from '../../utils/setAtRuleParams.js';
import setDeclarationValue from '../../utils/setDeclarationValue.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'length-zero-no-unit';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected unit',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, secondaryOptions, context) => {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
			},
			{
				actual: secondaryOptions,
				possible: {
					ignore: ['custom-properties'],
					ignoreFunctions: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) return;

		let needsFix;

		/**
		 * @param {import('postcss').Node} node
		 * @param {number} nodeIndex
		 * @param {import('postcss-value-parser').Node} valueNode
		 */
		function check(node, nodeIndex, valueNode) {
			const { value, sourceIndex } = valueNode;

			if (isMathFunction(valueNode)) return false;

			if (isFunction(valueNode) && optionsMatches(secondaryOptions, 'ignoreFunctions', value))
				return false;

			if (!isWord(valueNode)) return;

			const numberUnit = valueParser.unit(value);

			if (numberUnit === false) return;

			const { number, unit } = numberUnit;

			if (unit === '') return;

			if (!isLength(unit)) return;

			if (isFraction(unit)) return;

			if (!isZero(number)) return;

			if (context.fix) {
				valueNode.value = number;
				needsFix = true;

				return;
			}

			report({
				index: nodeIndex + sourceIndex + number.length,
				message: messages.rejected,
				node,
				result,
				ruleName,
			});
		}

		/**
		 * @param {import('postcss').AtRule} node
		 */
		function checkAtRule(node) {
			if (!isStandardSyntaxAtRule(node)) return;

			needsFix = false;

			const index = atRuleParamIndex(node);
			const parsedValue = valueParser(getAtRuleParams(node));

			parsedValue.walk((valueNode) => {
				return check(node, index, valueNode);
			});

			if (needsFix) {
				setAtRuleParams(node, parsedValue.toString());
			}
		}

		/**
		 * @param {import('postcss').Declaration} node
		 */
		function checkDecl(node) {
			needsFix = false;

			const { prop } = node;

			if (isLineHeight(prop)) return;

			if (isFlex(prop)) return;

			if (optionsMatches(secondaryOptions, 'ignore', 'custom-properties') && isCustomProperty(prop))
				return;

			const index = declarationValueIndex(node);
			const parsedValue = valueParser(getDeclarationValue(node));

			parsedValue.walk((valueNode, valueNodeIndex, valueNodes) => {
				if (isLineHeightValue(node, valueNodes, valueNodeIndex)) return;

				return check(node, index, valueNode);
			});

			if (needsFix) {
				setDeclarationValue(node, parsedValue.toString());
			}
		}

		root.walkAtRules(checkAtRule);
		root.walkDecls(checkDecl);
	};
};

/**
 * @param {import('postcss').Declaration} decl
 * @param {import('postcss-value-parser').Node[]} nodes
 * @param {number} index
 */
function isLineHeightValue({ prop }, nodes, index) {
	return (
		prop.toLowerCase() === 'font' &&
		index > 0 &&
		nodes[index - 1].type === 'div' &&
		nodes[index - 1].value === '/'
	);
}

/**
 * @param {string} prop
 */
function isLineHeight(prop) {
	return prop.toLowerCase() === 'line-height';
}

/**
 * @param {string} prop
 */
function isFlex(prop) {
	return prop.toLowerCase() === 'flex';
}

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isWord({ type }) {
	return type === 'word';
}

/**
 * @param {string} unit
 */
function isLength(unit) {
	return keywordSets.lengthUnits.has(unit.toLowerCase());
}

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isFunction({ type }) {
	return type === 'function';
}

/**
 * @param {string} unit
 */
function isFraction(unit) {
	return unit.toLowerCase() === 'fr';
}

/**
 * @param {string} number
 */
function isZero(number) {
	return Number.parseFloat(number) === 0;
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

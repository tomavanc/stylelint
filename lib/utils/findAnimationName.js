import getUnitFromValueNode from './getUnitFromValueNode.js';
import isStandardSyntaxValue from './isStandardSyntaxValue.js';
import isVariable from './isVariable.js';
import keywordSets from '../reference/keywordSets.js';
import postcssValueParser from 'postcss-value-parser';

/** @typedef {import('postcss-value-parser').Node} Node */

/**
 * Get the animation name within an `animation` shorthand property value.
 *
 * @param {string} value
 *
 * @returns {Node[]}
 */
export default function findAnimationName(value) {
	/** @type {Node[]} */
	const animationNames = [];

	const valueNodes = postcssValueParser(value);

	// Handle `inherit`, `initial` and etc
	if (
		valueNodes.nodes.length === 1 &&
		keywordSets.basicKeywords.has(valueNodes.nodes[0].value.toLowerCase())
	) {
		return [valueNodes.nodes[0]];
	}

	valueNodes.walk((valueNode) => {
		if (valueNode.type === 'function') {
			return false;
		}

		if (valueNode.type !== 'word') {
			return;
		}

		const valueLowerCase = valueNode.value.toLowerCase();

		// Ignore non-standard syntax
		if (!isStandardSyntaxValue(valueLowerCase)) {
			return;
		}

		// Ignore variables
		if (isVariable(valueLowerCase)) {
			return;
		}

		// Ignore keywords for other animation parts
		if (keywordSets.animationShorthandKeywords.has(valueLowerCase)) {
			return;
		}

		// Ignore numbers with units
		const unit = getUnitFromValueNode(valueNode);

		if (unit || unit === '') {
			return;
		}

		animationNames.push(valueNode);
	});

	return animationNames;
}

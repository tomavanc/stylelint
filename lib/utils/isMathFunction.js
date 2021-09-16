import MATH_FUNCTIONS from '../reference/mathFunctions.js';

/**
 * Check whether a node is math function
 *
 * @param {import('postcss-value-parser').Node} node postcss-value-parser node
 * @return {boolean} If `true`, the node is math function
 */
export default function isMathFunction(node) {
	return node.type === 'function' && MATH_FUNCTIONS.includes(node.value.toLowerCase());
}

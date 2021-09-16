/**
 * Check whether a function is standard
 *
 * @param {import('postcss-value-parser').Node} node
 * @returns {boolean}
 */
export default function (node) {
	// Function nodes without names are things in parentheses like Sass lists
	if (!node.value) {
		return false;
	}

	return true;
}

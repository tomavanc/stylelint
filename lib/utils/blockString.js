import beforeBlockString from './beforeBlockString.js';
import hasBlock from './hasBlock.js';
import rawNodeString from './rawNodeString.js';

/** @typedef {import('postcss').Rule} Rule */
/** @typedef {import('postcss').AtRule} AtRule */

/**
 * Return a CSS statement's block -- the string that starts and `{` and ends with `}`.
 *
 * If the statement has no block (e.g. `@import url(foo.css);`), returns an empty string.
 *
 * @param {Rule | AtRule} statement - postcss rule or at-rule node
 * @returns {string}
 */
export default function blockString(statement) {
	if (!hasBlock(statement)) {
		return '';
	}

	return rawNodeString(statement).slice(beforeBlockString(statement).length);
}

import keywordSets from '../reference/keywordSets.js';

/**
 * Check value is a custom ident
 *
 * @param {string} value
 */
export default function (value) {
	const valueLowerCase = value.toLowerCase();

	if (
		keywordSets.counterIncrementKeywords.has(valueLowerCase) ||
		Number.isFinite(Number.parseInt(valueLowerCase))
	) {
		return false;
	}

	return true;
}

import keywordSets from '../reference/keywordSets.js';

/**
 * Check whether a string is a keyframe selector.
 *
 * @param {string} selector
 * @returns {boolean}
 */
export default function (selector) {
	if (keywordSets.keyframeSelectorKeywords.has(selector)) {
		return true;
	}

	// Percentages
	if (/^(?:\d+|\d*\.\d+)%$/.test(selector)) {
		return true;
	}

	return false;
}

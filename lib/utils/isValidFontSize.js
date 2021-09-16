import keywordSets from '../reference/keywordSets.js';
import valueParser from 'postcss-value-parser';

/**
 * Check if a word is a font-size value.
 *
 * @param {string} word
 * @returns {boolean}
 */
export default function (word) {
	if (!word) {
		return false;
	}

	if (keywordSets.fontSizeKeywords.has(word)) {
		return true;
	}

	const numberUnit = valueParser.unit(word);

	if (!numberUnit) {
		return false;
	}

	const unit = numberUnit.unit;

	if (unit === '%') {
		return true;
	}

	if (keywordSets.lengthUnits.has(unit.toLowerCase())) {
		return true;
	}

	return false;
}

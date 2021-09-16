import htmlTags from 'html-tags';
import keywordSets from '../reference/keywordSets.js';
import mathMLTags from 'mathml-tag-names';
import svgTags from 'svg-tags';

/**
 * Check whether a type selector is a custom element
 *
 * @param {string} selector
 * @returns {boolean}
 */
export default function (selector) {
	if (!/^[a-z]/.test(selector)) {
		return false;
	}

	if (!selector.includes('-')) {
		return false;
	}

	const selectorLowerCase = selector.toLowerCase();

	if (selectorLowerCase !== selector) {
		return false;
	}

	if (svgTags.includes(selectorLowerCase)) {
		return false;
	}

	if (htmlTags.includes(selectorLowerCase)) {
		return false;
	}

	if (keywordSets.nonStandardHtmlTags.has(selectorLowerCase)) {
		return false;
	}

	if (mathMLTags.includes(selectorLowerCase)) {
		return false;
	}

	return true;
}

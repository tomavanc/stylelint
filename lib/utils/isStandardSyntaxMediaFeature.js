import hasInterpolation from '../utils/hasInterpolation.js';

/**
 * Check whether a media feature is standard
 *
 * @param {string} mediaFeature
 * @returns {boolean}
 */
export default function (mediaFeature) {
	// Remove outside parens
	mediaFeature = mediaFeature.slice(1, -1);

	// Parentheticals used for non-standard operations e.g. ($var - 10)
	if (mediaFeature.includes('(')) {
		return false;
	}

	// SCSS or Less interpolation
	if (hasInterpolation(mediaFeature)) {
		return false;
	}

	return true;
}

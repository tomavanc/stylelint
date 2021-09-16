/**
 * Check whether a media feature name is standard
 *
 * @param {string} mediaFeatureName
 * @returns {boolean}
 */
export default function (mediaFeatureName) {
	// SCSS interpolation
	if (/#\{.+?\}|\$.+/.test(mediaFeatureName)) {
		return false;
	}

	return true;
}

import hasLessInterpolation from '../utils/hasLessInterpolation.js';
import hasPsvInterpolation from '../utils/hasPsvInterpolation.js';
import hasScssInterpolation from '../utils/hasScssInterpolation.js';
import hasTplInterpolation from '../utils/hasTplInterpolation.js';

/**
 * Check whether a string has interpolation
 *
 * @param {string} string
 * @return {boolean} If `true`, a string has interpolation
 */
export default function (string) {
	// SCSS or Less interpolation
	if (
		hasLessInterpolation(string) ||
		hasScssInterpolation(string) ||
		hasTplInterpolation(string) ||
		hasPsvInterpolation(string)
	) {
		return true;
	}

	return false;
}

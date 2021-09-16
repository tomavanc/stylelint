/**
 * Check whether a media query is a custom
 * @param {string} mediaQuery
 * @returns {boolean}
 */
export default function (mediaQuery) {
	return mediaQuery.startsWith('--');
}

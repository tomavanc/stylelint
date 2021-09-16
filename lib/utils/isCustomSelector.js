/**
 * Check whether a selector is a custom one
 *
 * @param {string} selector
 * @returns {boolean}
 */
export default function (selector) {
	return selector.startsWith(':--');
}

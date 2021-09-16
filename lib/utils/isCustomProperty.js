/**
 * Check whether a property is a custom one
 * @param {string} property
 * @returns {boolean}
 */
export default function (property) {
	return property.startsWith('--');
}

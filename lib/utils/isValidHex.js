/**
 * Check if a value is a valid 3, 4, 6 or 8 digit hex
 *
 * @param {string} value
 * @returns {boolean}
 */
export default function (value) {
	return /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value);
}

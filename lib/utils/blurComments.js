/**
 * @param {string} source
 *
 * @returns {string}
 */
export default function (source, blurChar = '`') {
	return source.replace(/\/\*.*\*\//g, blurChar);
}

import formatters from '../formatters/index.js';

/**
 * @param {{ useOr?: boolean }} [options={}]
 * @returns {string}
 */
export default function getFormatterOptionsText(options = {}) {
	let output = Object.keys(formatters)
		.map((name) => `"${name}"`)
		.join(', ');

	if (options.useOr) {
		output = output.replace(/, ([a-z"]+)$/u, ' or $1');
	}

	return output;
}

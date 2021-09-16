import hasBlock from './hasBlock.js';

/**
 * @param {import('postcss').AtRule | import('postcss-less').AtRule} atRule
 * @returns {boolean}
 */
export default function (atRule) {
	return (
		(atRule.type === 'atrule' && 'variable' in atRule && atRule.variable && !hasBlock(atRule)) ||
		false
	);
}

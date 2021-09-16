/**
 * @param {import('postcss').AtRule} atRule
 * @returns {string}
 */
export default function getAtRuleParams(atRule) {
	const raws = atRule.raws;

	return (raws.params && raws.params.raw) || atRule.params;
}

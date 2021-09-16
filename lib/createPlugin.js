/** @typedef {import('stylelint').StylelintRule} StylelintRule */

/**
 * @param {string} ruleName
 * @param {StylelintRule} rule
 * @returns {{ruleName: string, rule: StylelintRule}}
 */
export default function (ruleName, rule) {
	return {
		ruleName,
		rule,
	};
}

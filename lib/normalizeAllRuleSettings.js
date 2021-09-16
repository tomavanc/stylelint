import normalizeRuleSettings from './normalizeRuleSettings.js';
import rules from './rules/index.js';

/** @typedef {import('stylelint').StylelintConfigRules} StylelintConfigRules */
/** @typedef {import('stylelint').StylelintConfig} StylelintConfig */

/**
 * @param {StylelintConfig} config
 * @return {StylelintConfig}
 */
function normalizeAllRuleSettings(config) {
	/** @type {StylelintConfigRules} */
	const normalizedRules = {};

	if (!config.rules) return config;

	for (const [ruleName, rawRuleSettings] of Object.entries(config.rules)) {
		const rule = rules[ruleName] || (config.pluginFunctions && config.pluginFunctions[ruleName]);

		if (!rule) {
			normalizedRules[ruleName] = [];
		} else {
			normalizedRules[ruleName] = normalizeRuleSettings(
				rawRuleSettings,
				ruleName,
				rule.primaryOptionArray,
			);
		}
	}

	config.rules = normalizedRules;

	return config;
}

export default normalizeAllRuleSettings;

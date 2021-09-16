import checkAgainstRule from './utils/checkAgainstRule.js';
import createPlugin from './createPlugin.js';
import createStylelint from './createStylelint.js';
import formatters from './formatters/index.js';
import postcssPlugin from './postcssPlugin.js';
import report from './utils/report.js';
import ruleMessages from './utils/ruleMessages.js';
import rules from './rules/index.js';
import standalone from './standalone.js';
import validateOptions from './utils/validateOptions.js';

/**
 * @type {import('postcss').PluginCreator<import('stylelint').PostcssPluginOptions> & import('stylelint').StylelintPublicAPI}
 */
export default postcssPlugin;

export const utils = {
	report,
	ruleMessages,
	validateOptions,
	checkAgainstRule,
};

export const lint = standalone;
export { rules, formatters, createPlugin };
export const createLinter = createStylelint;

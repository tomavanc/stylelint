'use strict';

/** @typedef {import('stylelint').RangeType} RangeType */
/** @typedef {import('stylelint').DisableReportRange} DisabledRange */
/** @typedef {import('stylelint').LintResult} StylelintResult */
/** @typedef {import('stylelint').ConfigRuleSettings<any, Object>} StylelintConfigRuleSettings */

/**
 * Returns a report describing which `results` (if any) contain disabled ranges
 * for rules that disallow disables via `reportDisables: true`.
 *
 * @param {StylelintResult[]} results
 */
module.exports = function (results) {
	results.forEach((result) => {
		// File with `CssSyntaxError` don't have `_postcssResult`s.
		if (!result._postcssResult) {
			return;
		}

		/** @type {{[ruleName: string]: Array<RangeType>}} */
		const rangeData = result._postcssResult.stylelint.disabledRanges;

		if (!rangeData) return;

		const config = result._postcssResult.stylelint.config;

		if (!config || !config.rules) return;

		// If no rules actually disallow disables, don't bother looking for ranges
		// that correspond to disabled rules.
		if (!Object.values(config.rules).some(reportDisablesForRule)) {
			return;
		}

		for (const [rule, ranges] of Object.entries(rangeData)) {
			for (const range of ranges) {
				if (!reportDisablesForRule(config.rules[rule] || [])) continue;

				// If the comment doesn't have a location, we can't report a useful error.
				// In practice we expect all comments to have locations, though.
				if (!range.comment.source || !range.comment.source.start) continue;

				result.warnings.push({
					text: `Rule "${rule}" may not be disabled`,
					rule: 'reportDisables',
					line: range.comment.source.start.line,
					column: range.comment.source.start.column,
					severity: 'error',
				});
			}
		}
	});
};

/**
 * @param {StylelintConfigRuleSettings} options
 * @return {boolean}
 */
function reportDisablesForRule(options) {
	if (!options || !options[1]) return false;

	return Boolean(options[1].reportDisables);
}

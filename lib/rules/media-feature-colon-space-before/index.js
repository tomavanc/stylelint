import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import mediaFeatureColonSpaceChecker from '../mediaFeatureColonSpaceChecker.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import whitespaceChecker from '../../utils/whitespaceChecker.js';

const ruleName = 'media-feature-colon-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ":"',
	rejectedBefore: () => 'Unexpected whitespace before ":"',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never'],
		});

		if (!validOptions) {
			return;
		}

		/** @type {Map<import('postcss').AtRule, number[]> | undefined} */
		let fixData;

		mediaFeatureColonSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: context.fix
				? (atRule, index) => {
						const paramColonIndex = index - atRuleParamIndex(atRule);

						fixData = fixData || new Map();
						const colonIndices = fixData.get(atRule) || [];

						colonIndices.push(paramColonIndex);
						fixData.set(atRule, colonIndices);

						return true;
				  }
				: null,
		});

		if (fixData) {
			fixData.forEach((colonIndices, atRule) => {
				let params = atRule.raws.params ? atRule.raws.params.raw : atRule.params;

				colonIndices
					.sort((a, b) => b - a)
					.forEach((index) => {
						const beforeColon = params.slice(0, index);
						const afterColon = params.slice(index);

						if (primary === 'always') {
							params = beforeColon.replace(/\s*$/, ' ') + afterColon;
						} else if (primary === 'never') {
							params = beforeColon.replace(/\s*$/, '') + afterColon;
						}
					});

				if (atRule.raws.params) {
					atRule.raws.params.raw = params;
				} else {
					atRule.params = params;
				}
			});
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

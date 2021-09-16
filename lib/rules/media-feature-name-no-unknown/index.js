import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import isCustomMediaQuery from '../../utils/isCustomMediaQuery.js';
import isRangeContextMediaFeature from '../../utils/isRangeContextMediaFeature.js';
import isStandardSyntaxMediaFeatureName from '../../utils/isStandardSyntaxMediaFeatureName.js';
import keywordSets from '../../reference/keywordSets.js';
import _mediaParser from 'postcss-media-query-parser';
const mediaParser = _mediaParser.default;

import optionsMatches from '../../utils/optionsMatches.js';
import rangeContextNodeParser from '../rangeContextNodeParser.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'media-feature-name-no-unknown';

const messages = ruleMessages(ruleName, {
	rejected: (mediaFeatureName) => `Unexpected unknown media feature name "${mediaFeatureName}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, secondaryOptions) => {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{ actual: primary },
			{
				actual: secondaryOptions,
				possible: {
					ignoreMediaFeatureNames: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkAtRules(/^media$/i, (atRule) => {
			mediaParser(atRule.params).walk(/^media-feature$/i, (mediaFeatureNode) => {
				const parent = mediaFeatureNode.parent;
				const mediaFeatureRangeContext = isRangeContextMediaFeature(parent.value);

				let value;
				let sourceIndex;

				if (mediaFeatureRangeContext) {
					const parsedRangeContext = rangeContextNodeParser(mediaFeatureNode);

					value = parsedRangeContext.name.value;
					sourceIndex = parsedRangeContext.name.sourceIndex;
				} else {
					value = mediaFeatureNode.value;
					sourceIndex = mediaFeatureNode.sourceIndex;
				}

				if (!isStandardSyntaxMediaFeatureName(value) || isCustomMediaQuery(value)) {
					return;
				}

				if (optionsMatches(secondaryOptions, 'ignoreMediaFeatureNames', value)) {
					return;
				}

				if (vendor.prefix(value) || keywordSets.mediaFeatureNames.has(value.toLowerCase())) {
					return;
				}

				report({
					index: atRuleParamIndex(atRule) + sourceIndex,
					message: messages.rejected(value),
					node: atRule,
					ruleName,
					result,
				});
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

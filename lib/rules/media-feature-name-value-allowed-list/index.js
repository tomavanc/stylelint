import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import isRangeContextMediaFeature from '../../utils/isRangeContextMediaFeature.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import _mediaParser from 'postcss-media-query-parser';
const mediaParser = _mediaParser.default;

import rangeContextNodeParser from '../rangeContextNodeParser.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isPlainObject } from 'is-plain-object';

const ruleName = 'media-feature-name-value-allowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (name, value) => `Unexpected value "${value}" for name "${name}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isPlainObject],
		});

		if (!validOptions) {
			return;
		}

		root.walkAtRules(/^media$/i, (atRule) => {
			mediaParser(atRule.params).walk(/^media-feature-expression$/i, (node) => {
				const mediaFeatureRangeContext = isRangeContextMediaFeature(node.parent.value);

				// Ignore boolean
				if (!node.value.includes(':') && !mediaFeatureRangeContext) {
					return;
				}

				const mediaFeatureNode = node.nodes.find((n) => n.type === 'media-feature');

				if (mediaFeatureNode == null) throw new Error('A `media-feature` node must be present');

				let mediaFeatureName;
				let values;

				if (mediaFeatureRangeContext) {
					const parsedRangeContext = rangeContextNodeParser(mediaFeatureNode);

					mediaFeatureName = parsedRangeContext.name.value;
					values = parsedRangeContext.values;
				} else {
					mediaFeatureName = mediaFeatureNode.value;
					const valueNode = node.nodes.find((n) => n.type === 'value');

					if (valueNode == null) throw new Error('A `value` node must be present');

					values = [valueNode];
				}

				for (const valueNode of values) {
					const value = valueNode.value;
					const unprefixedMediaFeatureName = vendor.unprefixed(mediaFeatureName);

					const allowedValuesKey = Object.keys(primary).find((featureName) =>
						matchesStringOrRegExp(unprefixedMediaFeatureName, featureName),
					);

					if (allowedValuesKey == null) {
						return;
					}

					const allowedValues = primary[allowedValuesKey];

					if (allowedValues == null) {
						return;
					}

					if (matchesStringOrRegExp(value, allowedValues)) {
						return;
					}

					report({
						index: atRuleParamIndex(atRule) + valueNode.sourceIndex,
						message: messages.rejected(mediaFeatureName, value),
						node: atRule,
						ruleName,
						result,
					});
				}
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

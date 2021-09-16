import isAutoprefixable from '../../utils/isAutoprefixable.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'media-feature-name-no-vendor-prefix';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected vendor-prefix',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, _secondaryOptions, context) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) {
			return;
		}

		root.walkAtRules(/^media$/i, (atRule) => {
			const params = atRule.params;

			if (!isAutoprefixable.mediaFeatureName(params)) {
				return;
			}

			const matches = atRule.toString().match(/-[a-z-]+device-pixel-ratio/gi);

			if (!matches) {
				return;
			}

			if (context.fix) {
				atRule.params = isAutoprefixable.unprefix(atRule.params);

				return;
			}

			matches.forEach((match) => {
				report({
					message: messages.rejected,
					node: atRule,
					word: match,
					result,
					ruleName,
				});
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

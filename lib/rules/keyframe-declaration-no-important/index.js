import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'keyframe-declaration-no-important';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected !important',
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) {
			return;
		}

		root.walkAtRules(/^(-(moz|webkit)-)?keyframes$/i, (atRuleKeyframes) => {
			atRuleKeyframes.walkDecls((decl) => {
				if (!decl.important) {
					return;
				}

				report({
					message: messages.rejected,
					node: decl,
					word: 'important',
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

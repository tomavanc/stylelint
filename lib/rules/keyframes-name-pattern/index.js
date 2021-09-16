import atRuleParamIndex from '../../utils/atRuleParamIndex.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'keyframes-name-pattern';

const messages = ruleMessages(ruleName, {
	expected: (keyframeName, pattern) =>
		`Expected keyframe name "${keyframeName}" to match pattern "${pattern}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isRegExp, isString],
		});

		if (!validOptions) {
			return;
		}

		const regex = isString(primary) ? new RegExp(primary) : primary;

		root.walkAtRules(/keyframes/i, (keyframesNode) => {
			const value = keyframesNode.params;

			if (regex.test(value)) {
				return;
			}

			report({
				index: atRuleParamIndex(keyframesNode),
				message: messages.expected(value, primary),
				node: keyframesNode,
				ruleName,
				result,
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

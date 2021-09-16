import beforeBlockString from '../../utils/beforeBlockString.js';
import blockString from '../../utils/blockString.js';
import isSingleLineString from '../../utils/isSingleLineString.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isNumber } from '../../utils/validateTypes.js';

const ruleName = 'declaration-block-single-line-max-declarations';

const messages = ruleMessages(ruleName, {
	expected: (max) => `Expected no more than ${max} ${max === 1 ? 'declaration' : 'declarations'}`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isNumber],
		});

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			if (!isSingleLineString(blockString(ruleNode))) {
				return;
			}

			if (!ruleNode.nodes) {
				return;
			}

			const decls = ruleNode.nodes.filter((node) => node.type === 'decl');

			if (decls.length <= primary) {
				return;
			}

			report({
				message: messages.expected(primary),
				node: ruleNode,
				index: beforeBlockString(ruleNode, { noRawBefore: true }).length,
				result,
				ruleName,
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

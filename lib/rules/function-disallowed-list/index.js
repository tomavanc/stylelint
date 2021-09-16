import declarationValueIndex from '../../utils/declarationValueIndex.js';
import isStandardSyntaxFunction from '../../utils/isStandardSyntaxFunction.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';
import vendor from '../../utils/vendor.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'function-disallowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (name) => `Unexpected function "${name}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isString, isRegExp],
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			const value = decl.value;

			valueParser(value).walk((node) => {
				if (node.type !== 'function') {
					return;
				}

				if (!isStandardSyntaxFunction(node)) {
					return;
				}

				if (!matchesStringOrRegExp(vendor.unprefixed(node.value), primary)) {
					return;
				}

				report({
					message: messages.rejected(node.value),
					node: decl,
					index: declarationValueIndex(decl) + node.sourceIndex,
					result,
					ruleName,
				});
			});
		});
	};
};

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

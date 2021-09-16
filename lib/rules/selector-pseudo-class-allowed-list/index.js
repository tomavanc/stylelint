// @ts-nocheck

import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-pseudo-class-allowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (selector) => `Unexpected pseudo-class "${selector}"`,
});

function rule(list) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: list,
			possible: [isString, isRegExp],
		});

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selector = ruleNode.selector;

			if (!selector.includes(':')) {
				return;
			}

			parseSelector(selector, result, ruleNode, (selectorTree) => {
				selectorTree.walkPseudos((pseudoNode) => {
					const value = pseudoNode.value;

					// Ignore pseudo-elements
					if (value.slice(0, 2) === '::') {
						return;
					}

					const name = value.slice(1);

					if (matchesStringOrRegExp(vendor.unprefixed(name), list)) {
						return;
					}

					report({
						index: pseudoNode.sourceIndex,
						message: messages.rejected(name),
						node: ruleNode,
						result,
						ruleName,
					});
				});
			});
		});
	};
}

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

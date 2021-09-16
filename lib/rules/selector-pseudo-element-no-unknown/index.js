// @ts-nocheck

import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import isStandardSyntaxSelector from '../../utils/isStandardSyntaxSelector.js';
import keywordSets from '../../reference/keywordSets.js';
import optionsMatches from '../../utils/optionsMatches.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-pseudo-element-no-unknown';

const messages = ruleMessages(ruleName, {
	rejected: (selector) => `Unexpected unknown pseudo-element selector "${selector}"`,
});

function rule(actual, options) {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{ actual },
			{
				actual: options,
				possible: {
					ignorePseudoElements: [isString],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selector = ruleNode.selector;

			// Return early before parse if no pseudos for performance

			if (!selector.includes(':')) {
				return;
			}

			parseSelector(selector, result, ruleNode, (selectorTree) => {
				selectorTree.walkPseudos((pseudoNode) => {
					const value = pseudoNode.value;

					if (!isStandardSyntaxSelector(value)) {
						return;
					}

					// Ignore pseudo-classes
					if (value.slice(0, 2) !== '::') {
						return;
					}

					if (optionsMatches(options, 'ignorePseudoElements', pseudoNode.value.slice(2))) {
						return;
					}

					const name = value.slice(2);

					if (vendor.prefix(name) || keywordSets.pseudoElements.has(name.toLowerCase())) {
						return;
					}

					report({
						message: messages.rejected(value),
						node: ruleNode,
						index: pseudoNode.sourceIndex,
						ruleName,
						result,
					});
				});
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

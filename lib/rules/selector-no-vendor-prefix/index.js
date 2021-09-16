// @ts-nocheck

import isAutoprefixable from '../../utils/isAutoprefixable.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import optionsMatches from '../../utils/optionsMatches.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-no-vendor-prefix';

const messages = ruleMessages(ruleName, {
	rejected: (selector) => `Unexpected vendor-prefix "${selector}"`,
});

function rule(actual, options, context) {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{ actual },
			{
				actual: options,
				possible: {
					ignoreSelectors: [isString],
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

			parseSelector(selector, result, ruleNode, (selectorTree) => {
				selectorTree.walkPseudos((pseudoNode) => {
					if (isAutoprefixable.selector(pseudoNode.value)) {
						if (optionsMatches(options, 'ignoreSelectors', pseudoNode.value)) {
							return;
						}

						if (context.fix) {
							ruleNode.selector = isAutoprefixable.unprefix(ruleNode.selector);

							return;
						}

						report({
							result,
							ruleName,
							message: messages.rejected(pseudoNode.value),
							node: ruleNode,
							index: (ruleNode.raws.before || '').length + pseudoNode.sourceIndex,
						});
					}
				});
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

// @ts-nocheck

import isNonNegativeInteger from '../../utils/isNonNegativeInteger.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import resolvedNestedSelector from 'postcss-resolve-nested-selector';
import ruleMessages from '../../utils/ruleMessages.js';
import selectorParser from 'postcss-selector-parser';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'selector-max-universal';

const messages = ruleMessages(ruleName, {
	expected: (selector, max) =>
		`Expected "${selector}" to have no more than ${max} universal ${
			max === 1 ? 'selector' : 'selectors'
		}`,
});

function rule(max) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: max,
			possible: isNonNegativeInteger,
		});

		if (!validOptions) {
			return;
		}

		function checkSelector(selectorNode, ruleNode) {
			const count = selectorNode.reduce((total, childNode) => {
				// Only traverse inside actual selectors
				// All logical combinations will be resolved as nested selector in `postcss-resolve-nested-selector`
				if (childNode.type === 'selector') {
					checkSelector(childNode, ruleNode);
				}

				return (total += childNode.type === 'universal' ? 1 : 0);
			}, 0);

			if (selectorNode.type !== 'root' && selectorNode.type !== 'pseudo' && count > max) {
				report({
					ruleName,
					result,
					node: ruleNode,
					message: messages.expected(selectorNode, max),
					word: selectorNode,
				});
			}
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			const selectors = [];

			selectorParser()
				.astSync(ruleNode.selector)
				.walk((node) => {
					if (node.type === 'selector') {
						selectors.push(String(node).trim());
					}
				});

			selectors.forEach((selector) => {
				resolvedNestedSelector(selector, ruleNode).forEach((resolvedSelector) => {
					parseSelector(resolvedSelector, result, ruleNode, (container) =>
						checkSelector(container, ruleNode),
					);
				});
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

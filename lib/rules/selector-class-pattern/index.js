// @ts-nocheck

import isKeyframeSelector from '../../utils/isKeyframeSelector.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import isStandardSyntaxSelector from '../../utils/isStandardSyntaxSelector.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import resolveNestedSelector from 'postcss-resolve-nested-selector';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isBoolean, isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-class-pattern';

const messages = ruleMessages(ruleName, {
	expected: (selectorValue, pattern) =>
		`Expected class selector ".${selectorValue}" to match pattern "${pattern}"`,
});

function rule(pattern, options) {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: pattern,
				possible: [isRegExp, isString],
			},
			{
				actual: options,
				possible: {
					resolveNestedSelectors: isBoolean,
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		const shouldResolveNestedSelectors = options && options.resolveNestedSelectors;
		const normalizedPattern = isString(pattern) ? new RegExp(pattern) : pattern;

		root.walkRules((ruleNode) => {
			const selector = ruleNode.selector;
			const selectors = ruleNode.selectors;

			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			if (selectors.some((s) => isKeyframeSelector(s))) {
				return;
			}

			// Only bother resolving selectors that have an interpolating &
			if (shouldResolveNestedSelectors && hasInterpolatingAmpersand(selector)) {
				resolveNestedSelector(selector, ruleNode).forEach((nestedSelector) => {
					if (!isStandardSyntaxSelector(nestedSelector)) {
						return;
					}

					parseSelector(nestedSelector, result, ruleNode, (s) => checkSelector(s, ruleNode));
				});
			} else {
				parseSelector(selector, result, ruleNode, (s) => checkSelector(s, ruleNode));
			}
		});

		function checkSelector(fullSelector, ruleNode) {
			fullSelector.walkClasses((classNode) => {
				const value = classNode.value;
				const sourceIndex = classNode.sourceIndex;

				if (normalizedPattern.test(value)) {
					return;
				}

				report({
					result,
					ruleName,
					message: messages.expected(value, pattern),
					node: ruleNode,
					index: sourceIndex,
				});
			});
		}
	};
}

// An "interpolating ampersand" means an "&" used to interpolate
// within another simple selector, rather than an "&" that
// stands on its own as a simple selector
function hasInterpolatingAmpersand(selector) {
	for (let i = 0, l = selector.length; i < l; i++) {
		if (selector[i] !== '&') {
			continue;
		}

		if (selector[i - 1] !== undefined && !isCombinator(selector[i - 1])) {
			return true;
		}

		if (selector[i + 1] !== undefined && !isCombinator(selector[i + 1])) {
			return true;
		}
	}

	return false;
}

function isCombinator(x) {
	return /[\s+>~]/.test(x);
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

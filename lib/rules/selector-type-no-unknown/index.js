// @ts-nocheck

import htmlTags from 'html-tags';
import isCustomElement from '../../utils/isCustomElement.js';
import isKeyframeSelector from '../../utils/isKeyframeSelector.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import isStandardSyntaxTypeSelector from '../../utils/isStandardSyntaxTypeSelector.js';
import keywordSets from '../../reference/keywordSets.js';
import mathMLTags from 'mathml-tag-names';
import optionsMatches from '../../utils/optionsMatches.js';
import parseSelector from '../../utils/parseSelector.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import svgTags from 'svg-tags';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'selector-type-no-unknown';

const messages = ruleMessages(ruleName, {
	rejected: (selector) => `Unexpected unknown type selector "${selector}"`,
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
					ignore: ['custom-elements', 'default-namespace'],
					ignoreNamespaces: [isString, isRegExp],
					ignoreTypes: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			const selector = ruleNode.selector;
			const selectors = ruleNode.selectors;

			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			if (selectors.some((s) => isKeyframeSelector(s))) {
				return;
			}

			parseSelector(selector, result, ruleNode, (selectorTree) => {
				selectorTree.walkTags((tagNode) => {
					if (!isStandardSyntaxTypeSelector(tagNode)) {
						return;
					}

					if (
						optionsMatches(options, 'ignore', 'custom-elements') &&
						isCustomElement(tagNode.value)
					) {
						return;
					}

					if (
						optionsMatches(options, 'ignore', 'default-namespace') &&
						!(typeof tagNode.namespace === 'string')
					) {
						return;
					}

					if (optionsMatches(options, 'ignoreNamespaces', tagNode.namespace)) {
						return;
					}

					if (optionsMatches(options, 'ignoreTypes', tagNode.value)) {
						return;
					}

					const tagName = tagNode.value;
					const tagNameLowerCase = tagName.toLowerCase();

					if (
						htmlTags.includes(tagNameLowerCase) ||
						// SVG tags are case-sensitive
						svgTags.includes(tagName) ||
						keywordSets.nonStandardHtmlTags.has(tagNameLowerCase) ||
						mathMLTags.includes(tagNameLowerCase)
					) {
						return;
					}

					report({
						message: messages.rejected(tagName),
						node: ruleNode,
						index: tagNode.sourceIndex,
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

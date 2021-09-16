import declarationValueIndex from '../../utils/declarationValueIndex.js';
import findFontFamily from '../../utils/findFontFamily.js';
import keywordSets from '../../reference/keywordSets.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'font-family-no-duplicate-names';

const messages = ruleMessages(ruleName, {
	rejected: (name) => `Unexpected duplicate name ${name}`,
});

/**
 * @param {import('postcss-value-parser').Node} node
 */
const isFamilyNameKeyword = (node) =>
	!('quote' in node) && keywordSets.fontFamilyKeywords.has(node.value.toLowerCase());

/** @type {import('stylelint').StylelintRule} */
const rule = (primary, secondaryOptions) => {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{ actual: primary },
			{
				actual: secondaryOptions,
				possible: {
					ignoreFontFamilyNames: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkDecls(/^font(-family)?$/i, (decl) => {
			const keywords = new Set();
			const familyNames = new Set();

			const fontFamilies = findFontFamily(decl.value);

			if (fontFamilies.length === 0) {
				return;
			}

			fontFamilies.forEach((fontFamilyNode) => {
				const family = fontFamilyNode.value.trim();

				if (optionsMatches(secondaryOptions, 'ignoreFontFamilyNames', family)) {
					return;
				}

				if (isFamilyNameKeyword(fontFamilyNode)) {
					if (keywords.has(family.toLowerCase())) {
						complain(
							messages.rejected(family),
							declarationValueIndex(decl) + fontFamilyNode.sourceIndex,
							decl,
						);

						return;
					}

					keywords.add(family);

					return;
				}

				if (familyNames.has(family)) {
					complain(
						messages.rejected(family),
						declarationValueIndex(decl) + fontFamilyNode.sourceIndex,
						decl,
					);

					return;
				}

				familyNames.add(family);
			});
		});

		/**
		 * @param {string} message
		 * @param {number} index
		 * @param {import('postcss').Declaration} decl
		 */
		function complain(message, index, decl) {
			report({
				result,
				ruleName,
				message,
				node: decl,
				index,
			});
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

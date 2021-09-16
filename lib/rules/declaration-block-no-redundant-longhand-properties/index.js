import arrayEqual from '../../utils/arrayEqual.js';
import eachDeclarationBlock from '../../utils/eachDeclarationBlock.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import shorthandData from '../../reference/shorthandData.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'declaration-block-no-redundant-longhand-properties';

const messages = ruleMessages(ruleName, {
	expected: (props) => `Expected shorthand property "${props}"`,
});

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
					ignoreShorthands: [isString, isRegExp],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		const longhandProperties = Object.entries(shorthandData).reduce(
			(/** @type {Record<string, string[]>} */ longhandProps, [key, values]) => {
				if (optionsMatches(secondaryOptions, 'ignoreShorthands', key)) {
					return longhandProps;
				}

				values.forEach((value) => {
					(longhandProps[value] || (longhandProps[value] = [])).push(key);
				});

				return longhandProps;
			},
			{},
		);

		eachDeclarationBlock(root, (eachDecl) => {
			/** @type {Record<string, string[]>} */
			const longhandDeclarations = {};

			eachDecl((decl) => {
				const prop = decl.prop.toLowerCase();
				const unprefixedProp = vendor.unprefixed(prop);
				const prefix = vendor.prefix(prop);

				const shorthandProperties = longhandProperties[unprefixedProp];

				if (!shorthandProperties) {
					return;
				}

				shorthandProperties.forEach((shorthandProperty) => {
					const prefixedShorthandProperty = prefix + shorthandProperty;

					if (!longhandDeclarations[prefixedShorthandProperty]) {
						longhandDeclarations[prefixedShorthandProperty] = [];
					}

					longhandDeclarations[prefixedShorthandProperty].push(prop);

					const prefixedShorthandData = shorthandData[shorthandProperty].map((item) => {
						return prefix + item;
					});

					if (
						!arrayEqual(
							prefixedShorthandData.sort(),
							longhandDeclarations[prefixedShorthandProperty].sort(),
						)
					) {
						return;
					}

					report({
						ruleName,
						result,
						node: decl,
						message: messages.expected(prefixedShorthandProperty),
					});
				});
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

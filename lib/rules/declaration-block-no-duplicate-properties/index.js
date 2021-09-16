import eachDeclarationBlock from '../../utils/eachDeclarationBlock.js';
import isCustomProperty from '../../utils/isCustomProperty.js';
import isStandardSyntaxProperty from '../../utils/isStandardSyntaxProperty.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isString } from '../../utils/validateTypes.js';

const ruleName = 'declaration-block-no-duplicate-properties';

const messages = ruleMessages(ruleName, {
	rejected: (property) => `Unexpected duplicate "${property}"`,
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
					ignore: ['consecutive-duplicates', 'consecutive-duplicates-with-different-values'],
					ignoreProperties: [isString],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		eachDeclarationBlock(root, (eachDecl) => {
			/** @type {string[]} */
			const decls = [];
			/** @type {string[]} */
			const values = [];

			eachDecl((decl) => {
				const prop = decl.prop;
				const value = decl.value;

				if (!isStandardSyntaxProperty(prop)) {
					return;
				}

				if (isCustomProperty(prop)) {
					return;
				}

				// Return early if the property is to be ignored
				if (optionsMatches(secondaryOptions, 'ignoreProperties', prop)) {
					return;
				}

				// Ignore the src property as commonly duplicated in at-fontface
				if (prop.toLowerCase() === 'src') {
					return;
				}

				const indexDuplicate = decls.indexOf(prop.toLowerCase());

				if (indexDuplicate !== -1) {
					if (
						optionsMatches(
							secondaryOptions,
							'ignore',
							'consecutive-duplicates-with-different-values',
						)
					) {
						// if duplicates are not consecutive
						if (indexDuplicate !== decls.length - 1) {
							report({
								message: messages.rejected(prop),
								node: decl,
								result,
								ruleName,
							});

							return;
						}

						// if values of consecutive duplicates are equal
						if (value === values[indexDuplicate]) {
							report({
								message: messages.rejected(value),
								node: decl,
								result,
								ruleName,
							});

							return;
						}

						return;
					}

					if (
						optionsMatches(secondaryOptions, 'ignore', 'consecutive-duplicates') &&
						indexDuplicate === decls.length - 1
					) {
						return;
					}

					report({
						message: messages.rejected(prop),
						node: decl,
						result,
						ruleName,
					});
				}

				decls.push(prop.toLowerCase());
				values.push(value.toLowerCase());
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

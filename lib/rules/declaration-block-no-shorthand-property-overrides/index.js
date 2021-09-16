import eachDeclarationBlock from '../../utils/eachDeclarationBlock.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import shorthandData from '../../reference/shorthandData.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';

const ruleName = 'declaration-block-no-shorthand-property-overrides';

const messages = ruleMessages(ruleName, {
	rejected: (shorthand, original) => `Unexpected shorthand "${shorthand}" after "${original}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) {
			return;
		}

		eachDeclarationBlock(root, (eachDecl) => {
			/** @type {Record<string, string>} */
			const declarations = {};

			eachDecl((decl) => {
				const prop = decl.prop;
				const unprefixedProp = vendor.unprefixed(prop);
				const prefix = vendor.prefix(prop).toLowerCase();

				const overrideables = shorthandData[unprefixedProp.toLowerCase()];

				if (!overrideables) {
					declarations[prop.toLowerCase()] = prop;

					return;
				}

				overrideables.forEach((longhandProp) => {
					if (!Object.prototype.hasOwnProperty.call(declarations, prefix + longhandProp)) {
						return;
					}

					report({
						ruleName,
						result,
						node: decl,
						message: messages.rejected(prop, declarations[prefix + longhandProp]),
					});
				});
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

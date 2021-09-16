import eachDeclarationBlock from '../../utils/eachDeclarationBlock.js';
import isCustomProperty from '../../utils/isCustomProperty.js';
import isStandardSyntaxProperty from '../../utils/isStandardSyntaxProperty.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'declaration-block-no-duplicate-custom-properties';

const messages = ruleMessages(ruleName, {
	rejected: (property) => `Unexpected duplicate "${property}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) {
			return;
		}

		eachDeclarationBlock(root, (eachDecl) => {
			const decls = new Set();

			eachDecl((decl) => {
				const prop = decl.prop;

				if (!isStandardSyntaxProperty(prop)) {
					return;
				}

				if (!isCustomProperty(prop)) {
					return;
				}

				const isDuplicate = decls.has(prop);

				if (isDuplicate) {
					report({
						message: messages.rejected(prop),
						node: decl,
						result,
						ruleName,
					});

					return;
				}

				decls.add(prop);
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

import valueParser from 'postcss-value-parser';

import declarationValueIndex from '../../utils/declarationValueIndex.js';
import isCustomProperty from '../../utils/isCustomProperty.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'custom-property-no-missing-var-function';

const messages = ruleMessages(ruleName, {
	rejected: (customProperty) => `Unexpected missing var function for "${customProperty}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) return;

		/** @type {Set<string>} */
		const knownCustomProperties = new Set();

		root.walkAtRules(/^property$/i, (atRule) => {
			knownCustomProperties.add(atRule.params);
		});

		root.walkDecls(({ prop }) => {
			if (isCustomProperty(prop)) knownCustomProperties.add(prop);
		});

		root.walkDecls((decl) => {
			const { value } = decl;
			const parsedValue = valueParser(value);

			parsedValue.walk((node) => {
				if (isVarFunction(node)) return false;

				if (!isDashedIdent(node)) return;

				if (!knownCustomProperties.has(node.value)) return;

				report({
					message: messages.rejected(node.value),
					node: decl,
					index: declarationValueIndex(decl) + node.sourceIndex,
					result,
					ruleName,
				});

				return false;
			});
		});
	};
};

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isDashedIdent({ type, value }) {
	return type === 'word' && value.startsWith('--');
}

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isVarFunction({ type, value }) {
	return type === 'function' && value === 'var';
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

import valueParser from 'postcss-value-parser';

import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getDeclarationValue from '../../utils/getDeclarationValue.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'color-no-hex';

const messages = ruleMessages(ruleName, {
	rejected: (hex) => `Unexpected hex color "${hex}"`,
});

const HEX = /^#[0-9A-Za-z]+/;
const IGNORED_FUNCTIONS = new Set(['url']);

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			const parsedValue = valueParser(getDeclarationValue(decl));

			parsedValue.walk((node) => {
				if (isIgnoredFunction(node)) return false;

				if (!isHexColor(node)) return;

				report({
					message: messages.rejected(node.value),
					node: decl,
					index: declarationValueIndex(decl) + node.sourceIndex,
					result,
					ruleName,
				});
			});
		});
	};
};

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isIgnoredFunction({ type, value }) {
	return type === 'function' && IGNORED_FUNCTIONS.has(value.toLowerCase());
}

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isHexColor({ type, value }) {
	return type === 'word' && HEX.test(value);
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

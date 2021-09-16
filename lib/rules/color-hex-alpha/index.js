import declarationValueIndex from '../../utils/declarationValueIndex.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';

const ruleName = 'color-hex-alpha';

const messages = ruleMessages(ruleName, {
	expected: (hex) => `Expected alpha channel in "${hex}"`,
	unexpected: (hex) => `Unexpected alpha channel in "${hex}"`,
});

const HEX = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never'],
		});

		if (!validOptions) return;

		root.walkDecls((decl) => {
			const parsedValue = valueParser(decl.value);

			parsedValue.walk((node) => {
				if (isUrlFunction(node)) return false;

				if (!isHexColor(node)) return;

				const { value } = node;

				if (primary === 'always' && hasAlphaChannel(value)) return;

				if (primary === 'never' && !hasAlphaChannel(value)) return;

				report({
					message: primary === 'never' ? messages.unexpected(value) : messages.expected(value),
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
function isUrlFunction({ type, value }) {
	return type === 'function' && value === 'url';
}

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isHexColor({ type, value }) {
	return type === 'word' && HEX.test(value);
}

/**
 * @param {string} hex
 */
function hasAlphaChannel(hex) {
	return hex.length === 5 || hex.length === 9;
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

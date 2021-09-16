import declarationValueIndex from '../../utils/declarationValueIndex.js';
import isValidHex from '../../utils/isValidHex.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';

const ruleName = 'color-no-invalid-hex';

const messages = ruleMessages(ruleName, {
	rejected: (hex) => `Unexpected invalid hex color "${hex}"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual: primary });

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			valueParser(decl.value).walk(({ value, type, sourceIndex }) => {
				if (type === 'function' && value.endsWith('url')) return false;

				if (type !== 'word') return;

				const hexMatch = /^#[0-9A-Za-z]+/.exec(value);

				if (!hexMatch) return;

				const hexValue = hexMatch[0];

				if (isValidHex(hexValue)) return;

				report({
					message: messages.rejected(hexValue),
					node: decl,
					index: declarationValueIndex(decl) + sourceIndex,
					result,
					ruleName,
				});
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

import declarationValueIndex from '../../utils/declarationValueIndex.js';
import getUnitFromValueNode from '../../utils/getUnitFromValueNode.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import valueParser from 'postcss-value-parser';
import vendor from '../../utils/vendor.js';
import { isPlainObject } from 'is-plain-object';

const ruleName = 'declaration-property-unit-disallowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (property, unit) => `Unexpected unit "${unit}" for property "${property}"`,
});

/** @type {import('stylelint').StylelintRule<Record<string, string[]>>} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isPlainObject],
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			const prop = decl.prop;
			const value = decl.value;

			const unprefixedProp = vendor.unprefixed(prop);

			const propKey = Object.keys(primary).find((propIdentifier) =>
				matchesStringOrRegExp(unprefixedProp, propIdentifier),
			);

			if (!propKey) {
				return;
			}

			const propList = primary[propKey];

			if (!propList) {
				return;
			}

			valueParser(value).walk((node) => {
				// Ignore wrong units within `url` function
				if (node.type === 'function' && node.value.toLowerCase() === 'url') {
					return false;
				}

				if (node.type === 'string') {
					return;
				}

				const unit = getUnitFromValueNode(node);

				if (!unit || (unit && !propList.includes(unit.toLowerCase()))) {
					return;
				}

				report({
					message: messages.rejected(prop, unit),
					node: decl,
					index: declarationValueIndex(decl) + node.sourceIndex,
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

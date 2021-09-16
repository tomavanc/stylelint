// @ts-nocheck

import isAutoprefixable from '../../utils/isAutoprefixable.js';
import isStandardSyntaxDeclaration from '../../utils/isStandardSyntaxDeclaration.js';
import isStandardSyntaxProperty from '../../utils/isStandardSyntaxProperty.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import styleSearch from 'style-search';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isString } from '../../utils/validateTypes.js';

const ruleName = 'value-no-vendor-prefix';

const messages = ruleMessages(ruleName, {
	rejected: (value) => `Unexpected vendor-prefix "${value}"`,
});

const valuePrefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];

function rule(actual, options, context) {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{ actual },
			{
				optional: true,
				actual: options,
				possible: {
					ignoreValues: [isString],
				},
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			if (
				!isStandardSyntaxDeclaration(decl) ||
				!isStandardSyntaxProperty(decl.prop) ||
				!decl.value.startsWith('-')
			) {
				return;
			}

			const prop = decl.prop;
			const value = decl.value;
			const unprefixedValue = vendor.unprefixed(value);

			//return early if value is to be ignored
			if (optionsMatches(options, 'ignoreValues', unprefixedValue)) {
				return;
			}

			// Search the full declaration in order to get an accurate index

			styleSearch({ source: value.toLowerCase(), target: valuePrefixes }, (match) => {
				const fullIdentifier = /^(-[a-z-]+)\b/i.exec(value.slice(match.startIndex))[1];

				if (!isAutoprefixable.propertyValue(fullIdentifier)) {
					return;
				}

				if (context.fix) {
					decl.value = isAutoprefixable.unprefix(decl.value);

					return;
				}

				report({
					message: messages.rejected(fullIdentifier),
					node: decl,
					index: prop.length + (decl.raws.between || '').length + match.startIndex,
					result,
					ruleName,
				});
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

// @ts-nocheck

import isAutoprefixable from '../../utils/isAutoprefixable.js';
import optionsMatches from '../../utils/optionsMatches.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'property-no-vendor-prefix';

const messages = ruleMessages(ruleName, {
	rejected: (property) => `Unexpected vendor-prefix "${property}"`,
});

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
					ignoreProperties: [isString, isRegExp],
				},
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			const prop = decl.prop;
			const unprefixedProp = vendor.unprefixed(prop);

			//return early if property is to be ignored
			if (optionsMatches(options, 'ignoreProperties', unprefixedProp)) {
				return;
			}

			// Make sure there's a vendor prefix,
			// but this isn't a custom property

			if (prop[0] !== '-' || prop[1] === '-') {
				return;
			}

			if (!isAutoprefixable.property(prop)) {
				return;
			}

			if (context.fix) {
				decl.prop = isAutoprefixable.unprefix(decl.prop);

				return;
			}

			report({
				message: messages.rejected(prop),
				node: decl,
				result,
				ruleName,
			});
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

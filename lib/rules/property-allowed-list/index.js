// @ts-nocheck

import isCustomProperty from '../../utils/isCustomProperty.js';
import isStandardSyntaxProperty from '../../utils/isStandardSyntaxProperty.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import vendor from '../../utils/vendor.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'property-allowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (property) => `Unexpected property "${property}"`,
});

function rule(list) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: list,
			possible: [isString, isRegExp],
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			const prop = decl.prop;

			if (!isStandardSyntaxProperty(prop)) {
				return;
			}

			if (isCustomProperty(prop)) {
				return;
			}

			if (matchesStringOrRegExp(vendor.unprefixed(prop), list)) {
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

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

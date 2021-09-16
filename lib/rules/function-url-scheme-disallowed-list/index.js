import functionArgumentsSearch from '../../utils/functionArgumentsSearch.js';
import getSchemeFromUrl from '../../utils/getSchemeFromUrl.js';
import isStandardSyntaxUrl from '../../utils/isStandardSyntaxUrl.js';
import matchesStringOrRegExp from '../../utils/matchesStringOrRegExp.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';
import { isRegExp, isString } from '../../utils/validateTypes.js';

const ruleName = 'function-url-scheme-disallowed-list';

const messages = ruleMessages(ruleName, {
	rejected: (scheme) => `Unexpected URL scheme "${scheme}:"`,
});

/** @type {import('stylelint').StylelintRule} */
const rule = (primary) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [isString, isRegExp],
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			functionArgumentsSearch(decl.toString().toLowerCase(), 'url', (args, index) => {
				const unspacedUrlString = args.trim();

				if (!isStandardSyntaxUrl(unspacedUrlString)) {
					return;
				}

				const urlString = unspacedUrlString.replace(/^['"]+|['"]+$/g, '');
				const scheme = getSchemeFromUrl(urlString);

				if (scheme === null) {
					return;
				}

				if (!matchesStringOrRegExp(scheme, primary)) {
					return;
				}

				report({
					message: messages.rejected(scheme),
					node: decl,
					index,
					result,
					ruleName,
				});
			});
		});
	};
};

rule.primaryOptionArray = true;

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

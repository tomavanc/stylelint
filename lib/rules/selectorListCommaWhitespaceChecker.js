// @ts-nocheck

import isStandardSyntaxRule from '../utils/isStandardSyntaxRule.js';
import report from '../utils/report.js';
import styleSearch from 'style-search';

export default function (opts) {
	opts.root.walkRules((rule) => {
		if (!isStandardSyntaxRule(rule)) {
			return;
		}

		const selector = rule.raws.selector ? rule.raws.selector.raw : rule.selector;

		styleSearch(
			{
				source: selector,
				target: ',',
				functionArguments: 'skip',
			},
			(match) => {
				checkDelimiter(selector, match.startIndex, rule);
			},
		);
	});

	function checkDelimiter(source, index, node) {
		opts.locationChecker({
			source,
			index,
			err: (m) => {
				if (opts.fix && opts.fix(node, index)) {
					return;
				}

				report({
					message: m,
					node,
					index,
					result: opts.result,
					ruleName: opts.checkedRuleName,
				});
			},
		});
	}
}

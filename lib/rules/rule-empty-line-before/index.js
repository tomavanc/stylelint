// @ts-nocheck

import addEmptyLineBefore from '../../utils/addEmptyLineBefore.js';
import getPreviousNonSharedLineCommentNode from '../../utils/getPreviousNonSharedLineCommentNode.js';
import hasEmptyLine from '../../utils/hasEmptyLine.js';
import isAfterSingleLineComment from '../../utils/isAfterSingleLineComment.js';
import isFirstNested from '../../utils/isFirstNested.js';
import isFirstNodeOfRoot from '../../utils/isFirstNodeOfRoot.js';
import isSingleLineString from '../../utils/isSingleLineString.js';
import isStandardSyntaxRule from '../../utils/isStandardSyntaxRule.js';
import optionsMatches from '../../utils/optionsMatches.js';
import removeEmptyLinesBefore from '../../utils/removeEmptyLinesBefore.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'rule-empty-line-before';

const messages = ruleMessages(ruleName, {
	expected: 'Expected empty line before rule',
	rejected: 'Unexpected empty line before rule',
});

function rule(expectation, options, context) {
	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: expectation,
				possible: ['always', 'never', 'always-multi-line', 'never-multi-line'],
			},
			{
				actual: options,
				possible: {
					ignore: ['after-comment', 'first-nested', 'inside-block'],
					except: [
						'after-rule',
						'after-single-line-comment',
						'first-nested',
						'inside-block-and-after-rule',
						'inside-block',
					],
				},
				optional: true,
			},
		);

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			// Ignore the first node
			if (isFirstNodeOfRoot(ruleNode)) {
				return;
			}

			// Optionally ignore the expectation if a comment precedes this node
			if (
				optionsMatches(options, 'ignore', 'after-comment') &&
				ruleNode.prev() &&
				ruleNode.prev().type === 'comment'
			) {
				return;
			}

			// Optionally ignore the node if it is the first nested
			if (optionsMatches(options, 'ignore', 'first-nested') && isFirstNested(ruleNode)) {
				return;
			}

			const isNested = ruleNode.parent.type !== 'root';

			// Optionally ignore the expectation if inside a block
			if (optionsMatches(options, 'ignore', 'inside-block') && isNested) {
				return;
			}

			// Ignore if the expectation is for multiple and the rule is single-line
			if (expectation.includes('multi-line') && isSingleLineString(ruleNode.toString())) {
				return;
			}

			let expectEmptyLineBefore = Boolean(expectation.includes('always'));

			// Optionally reverse the expectation if any exceptions apply
			if (
				(optionsMatches(options, 'except', 'first-nested') && isFirstNested(ruleNode)) ||
				(optionsMatches(options, 'except', 'after-rule') && isAfterRule(ruleNode)) ||
				(optionsMatches(options, 'except', 'inside-block-and-after-rule') &&
					isNested &&
					isAfterRule(ruleNode)) ||
				(optionsMatches(options, 'except', 'after-single-line-comment') &&
					isAfterSingleLineComment(ruleNode)) ||
				(optionsMatches(options, 'except', 'inside-block') && isNested)
			) {
				expectEmptyLineBefore = !expectEmptyLineBefore;
			}

			const hasEmptyLineBefore = hasEmptyLine(ruleNode.raws.before);

			// Return if the expectation is met
			if (expectEmptyLineBefore === hasEmptyLineBefore) {
				return;
			}

			// Fix
			if (context.fix) {
				if (expectEmptyLineBefore) {
					addEmptyLineBefore(ruleNode, context.newline);
				} else {
					removeEmptyLinesBefore(ruleNode, context.newline);
				}

				return;
			}

			const message = expectEmptyLineBefore ? messages.expected : messages.rejected;

			report({
				message,
				node: ruleNode,
				result,
				ruleName,
			});
		});
	};
}

function isAfterRule(ruleNode) {
	const prevNode = getPreviousNonSharedLineCommentNode(ruleNode);

	return prevNode && prevNode.type === 'rule';
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

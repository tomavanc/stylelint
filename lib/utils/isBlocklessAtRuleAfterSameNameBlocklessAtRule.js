import getPreviousNonSharedLineCommentNode from './getPreviousNonSharedLineCommentNode.js';
import isBlocklessAtRuleAfterBlocklessAtRule from './isBlocklessAtRuleAfterBlocklessAtRule.js';
import { isAtRule } from './typeGuards.js';

/**
 * @param {import('postcss').AtRule} atRule
 * @returns {boolean}
 */
export default function (atRule) {
	if (!isBlocklessAtRuleAfterBlocklessAtRule(atRule)) {
		return false;
	}

	const previousNode = getPreviousNonSharedLineCommentNode(atRule);

	if (previousNode && isAtRule(previousNode)) {
		return previousNode.name === atRule.name;
	}

	return false;
}

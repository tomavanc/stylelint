import getPreviousNonSharedLineCommentNode from './getPreviousNonSharedLineCommentNode.js';
import hasBlock from './hasBlock.js';
import { isAtRule } from './typeGuards.js';

/**
 * @param {import('postcss').AtRule} atRule
 * @returns {boolean}
 */
export default function (atRule) {
	if (atRule.type !== 'atrule') {
		return false;
	}

	const previousNode = getPreviousNonSharedLineCommentNode(atRule);

	if (previousNode === undefined) {
		return false;
	}

	return isAtRule(previousNode) && !hasBlock(previousNode) && !hasBlock(atRule);
}

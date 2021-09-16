import isSharedLineComment from './isSharedLineComment.js';

/**
 * @param {import('postcss').Node} node
 */
export default function (node) {
	const previousNode = node.prev();

	if (!previousNode || previousNode.type !== 'comment') {
		return false;
	}

	return !isSharedLineComment(previousNode);
}

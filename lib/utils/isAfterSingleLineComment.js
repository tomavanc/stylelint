import isSharedLineComment from './isSharedLineComment.js';

/**
 * @param {import('postcss').Node} node
 */
function isAfterSingleLineComment(node) {
	const prevNode = node.prev();

	return (
		prevNode !== undefined &&
		prevNode.type === 'comment' &&
		!isSharedLineComment(prevNode) &&
		prevNode.source &&
		prevNode.source.start &&
		prevNode.source.end &&
		prevNode.source.start.line === prevNode.source.end.line
	);
}

export default isAfterSingleLineComment;

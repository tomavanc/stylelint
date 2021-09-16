import getPreviousNonSharedLineCommentNode from './getPreviousNonSharedLineCommentNode.js';
import isCustomProperty from './isCustomProperty.js';
import isStandardSyntaxDeclaration from './isStandardSyntaxDeclaration.js';
import { isDeclaration } from './typeGuards.js';

/**
 * @param {import('postcss').Node} node
 */
export default function (node) {
	const prevNode = getPreviousNonSharedLineCommentNode(node);

	return (
		prevNode !== undefined &&
		isDeclaration(prevNode) &&
		isStandardSyntaxDeclaration(prevNode) &&
		!isCustomProperty(prevNode.prop || '')
	);
}

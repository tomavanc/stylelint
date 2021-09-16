/** @typedef {import('postcss').Node} Node */
/** @typedef {import('postcss').Node} NodeSource */

/**
 * @param {Node} node
 * @returns {node is import('postcss').Root}
 */
export const isRoot = function isRoot(node) {
	return node.type === 'root';
};

/**
 * @param {Node} node
 * @returns {node is import('postcss').Rule}
 */
export const isRule = function isRule(node) {
	return node.type === 'rule';
};

/**
 * @param {Node} node
 * @returns {node is import('postcss').AtRule}
 */
export const isAtRule = function isAtRule(node) {
	return node.type === 'atrule';
};

/**
 * @param {Node} node
 * @returns {node is import('postcss').Comment}
 */
export const isComment = function isComment(node) {
	return node.type === 'comment';
};

/**
 * @param {Node} node
 * @returns {node is import('postcss').Declaration}
 */
export const isDeclaration = function isDeclaration(node) {
	return node.type === 'decl';
};

/**
 * @param {Node} node
 * @returns {node is (Node & {source: NodeSource})}
 */
export const hasSource = function hasSource(node) {
	return Boolean(node.source);
};

/**
 * Check if a statement has an empty block.
 *
 * @param {import('postcss').Rule | import('postcss').AtRule} statement - postcss rule or at-rule node
 * @return {boolean} True if the statement has a block and it is empty
 */
export default function (statement) {
	return (
		statement.nodes !== undefined && statement.nodes.length === 0 // has block
	); // and is empty
}

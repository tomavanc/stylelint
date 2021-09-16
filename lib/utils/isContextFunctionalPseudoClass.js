import keywordSets from '../reference/keywordSets.js';

/**
 * Check whether a node is a context-functional pseudo-class (i.e. either a logical combination
 * or a 'aNPlusBOfSNotationPseudoClasses' / tree-structural pseudo-class)
 *
 * @param {import('postcss-selector-parser').Pseudo} node postcss-selector-parser node (of type pseudo)
 * @return {boolean} If `true`, the node is a context-functional pseudo-class
 */
export default function isContextFunctionalPseudoClass(node) {
	if (node.type === 'pseudo') {
		const normalisedParentName = node.value.toLowerCase().replace(/:+/, '');

		return (
			keywordSets.logicalCombinationsPseudoClasses.has(normalisedParentName) ||
			keywordSets.aNPlusBOfSNotationPseudoClasses.has(normalisedParentName)
		);
	}

	return false;
}

// @ts-nocheck

import declarationValueIndex from '../../utils/declarationValueIndex.js';
import findAnimationName from '../../utils/findAnimationName.js';
import keywordSets from '../../reference/keywordSets.js';
import report from '../../utils/report.js';
import ruleMessages from '../../utils/ruleMessages.js';
import validateOptions from '../../utils/validateOptions.js';

const ruleName = 'no-unknown-animations';

const messages = ruleMessages(ruleName, {
	rejected: (animationName) => `Unexpected unknown animation name "${animationName}"`,
});

function rule(actual) {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, { actual });

		if (!validOptions) {
			return;
		}

		const declaredAnimations = new Set();

		root.walkAtRules(/(-(moz|webkit)-)?keyframes/i, (atRule) => {
			declaredAnimations.add(atRule.params);
		});

		root.walkDecls((decl) => {
			if (decl.prop.toLowerCase() === 'animation' || decl.prop.toLowerCase() === 'animation-name') {
				const animationNames = findAnimationName(decl.value);

				if (animationNames.length === 0) {
					return;
				}

				animationNames.forEach((animationNameNode) => {
					if (keywordSets.animationNameKeywords.has(animationNameNode.value.toLowerCase())) {
						return;
					}

					if (declaredAnimations.has(animationNameNode.value)) {
						return;
					}

					report({
						result,
						ruleName,
						message: messages.rejected(animationNameNode.value),
						node: decl,
						index: declarationValueIndex(decl) + animationNameNode.sourceIndex,
					});
				});
			}
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;
export default rule;

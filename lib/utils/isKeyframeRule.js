import { isAtRule } from './typeGuards.js';

/**
 * Check if a rule is a keyframe one
 *
 * @param {import('postcss').Rule} rule
 * @returns {boolean}
 */
export default function (rule) {
	const parent = rule.parent;

	if (!parent) {
		return false;
	}

	return isAtRule(parent) && parent.name.toLowerCase() === 'keyframes';
}

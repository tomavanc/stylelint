import configurationError from './configurationError.js';
import globalModules from 'global-modules';
import resolveFrom from 'resolve-from';

/**
 * @param {string} basedir
 * @param {string} lookup
 * @return {string}
 */
export default function getModulePath(basedir, lookup) {
	// 1. Try to resolve from the provided directory
	// 2. Try to resolve from `process.cwd`
	// 3. Try to resolve from global `node_modules` directory
	let path = resolveFrom.silent(basedir, lookup);

	if (!path) {
		path = resolveFrom.silent(process.cwd(), lookup);
	}

	if (!path) {
		path = resolveFrom.silent(globalModules, lookup);
	}

	if (!path) {
		throw configurationError(`Could not find "${lookup}". Do you need a \`configBasedir\`?`);
	}

	return path;
}

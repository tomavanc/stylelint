// Try to get file ignorer from '.stylelintignore'

import fs from 'fs';
import path from 'path';
import { default as ignore } from 'ignore';

import isPathNotFoundError from './isPathNotFoundError.js';

const DEFAULT_IGNORE_FILENAME = '.stylelintignore';

/** @typedef {import('stylelint').StylelintStandaloneOptions} StylelintOptions */

/**
 * @param {StylelintOptions} options
 * @return {import('ignore').Ignore}
 */
export default function (options) {
	const ignoreFilePath = options.ignorePath || DEFAULT_IGNORE_FILENAME;
	const absoluteIgnoreFilePath = path.isAbsolute(ignoreFilePath)
		? ignoreFilePath
		: path.resolve(process.cwd(), ignoreFilePath);
	let ignoreText = '';

	try {
		ignoreText = fs.readFileSync(absoluteIgnoreFilePath, 'utf8');
	} catch (readError) {
		if (!isPathNotFoundError(readError)) throw readError;
	}

	const ignorePattern = options.ignorePattern || [];
	const ignorer = ignore().add(ignoreText).add(ignorePattern);

	return ignorer;
}

import createStylelint from './createStylelint.js';
import path from 'path';

/** @typedef {import('stylelint').PostcssPluginOptions} PostcssPluginOptions */
/** @typedef {import('stylelint').StylelintConfig} StylelintConfig */

/**
 * @type {import('postcss').PluginCreator<PostcssPluginOptions>}
 * */
export default (options = {}) => {
	const tailoredOptions = isConfig(options) ? { config: options } : options;
	const stylelint = createStylelint(tailoredOptions);

	return {
		postcssPlugin: 'stylelint',
		Once(root, { result }) {
			let filePath = root.source && root.source.input.file;

			if (filePath && !path.isAbsolute(filePath)) {
				filePath = path.join(process.cwd(), filePath);
			}

			return stylelint._lintSource({
				filePath,
				existingPostcssResult: result,
			});
		},
	};
};

export const postcss = true;

/**
 * @param {PostcssPluginOptions} options
 * @returns {options is StylelintConfig}
 */
function isConfig(options) {
	return 'rules' in options;
}

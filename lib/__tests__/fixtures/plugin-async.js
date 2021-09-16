import stylelint from '../...js';

const ruleName = 'plugin/async';

const rule = (enabled) => (root, result) => {
	const validOptions = stylelint.utils.validateOptions(result, ruleName, {
		actual: enabled,
		possible: [true, false],
	});

	if (!validOptions) {
		return null;
	}

	return new Promise((resolve) => {
		setTimeout(() => {
			stylelint.utils.report({
				result,
				ruleName,
				message: 'Async rule',
				node: root,
			});
			resolve();
		});
	});
};

export default stylelint.createPlugin(ruleName, rule);

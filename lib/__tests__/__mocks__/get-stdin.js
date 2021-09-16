export default () => {
	return new Promise((resolve) => {
		process.nextTick(() => {
			resolve('');
		});
	});
};

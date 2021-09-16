import isRectangular from '../isRectangular.js';

describe('isRectangular is', () => {
	test('true when rectangular', () => {
		expect(
			isRectangular([
				['a', 'a', '.'],
				['a', 'a', '.'],
				['.', 'b', 'c'],
			]),
		).toEqual(true);
	});

	test('false when not-rectangular', () => {
		expect(
			isRectangular([
				['a', 'a', '.'],
				['a', 'a'],
				['.', 'b', 'a'],
			]),
		).toEqual(false);
	});
});

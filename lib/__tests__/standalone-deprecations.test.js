import blockNoEmpty from '../rules/block-no-empty.js';
import configBlockNoEmpty from './fixtures/config-block-no-empty.js';
import standalone from '../standalone.js';

jest.mock('../rules/block-no-empty');

blockNoEmpty.mockImplementation(() => {
	return (root, result) => {
		result.warn('Some deprecation', {
			stylelintType: 'deprecation',
		});
	};
});

describe('standalone with deprecations', () => {
	it('works', () => {
		return standalone({
			code: 'a {}',
			config: configBlockNoEmpty,
		}).then((data) => {
			expect(data.output).toContain('Some deprecation');
			expect(data.results).toHaveLength(1);
			expect(data.results[0].deprecations).toHaveLength(1);
			expect(data.results[0].deprecations[0].text).toBe('Some deprecation');
		});
	});
});

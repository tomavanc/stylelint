import { createCommons } from 'simport';

const { __filename, __dirname, require } = createCommons(import.meta.url);

import blockNoEmpty from '../rules/block-no-empty.js';
import configBlockNoEmpty from './fixtures/config-block-no-empty.js';
import path from 'path';
import replaceBackslashes from '../testUtils/replaceBackslashes.js';
import standalone from '../standalone.js';

jest.mock('../rules/block-no-empty');

blockNoEmpty.mockImplementation(() => {
	return (root, result) => {
		result.warn('Some parseError', {
			stylelintType: 'parseError',
		});
	};
});

test('standalone with deprecations', async () => {
	const data = await standalone({
		code: 'a {}',
		config: configBlockNoEmpty,
	});

	expect(data.output).toContain('Some parseError');
	expect(data.results).toHaveLength(1);
	expect(data.results[0].parseErrors).toHaveLength(1);
	expect(data.results[0].parseErrors[0].text).toBe('Some parseError');
});

test('file with correct syntax reported correctly', async () => {
	const data = await standalone({
		files: replaceBackslashes(path.join(__dirname, 'fixtures/broken-syntax/correct-syntax.css')),
	});

	expect(data.results[0]).toMatchObject({
		parseErrors: [],
		errored: false,
		warnings: [],
	});
});

test('file with invalid syntax reported correctly', async () => {
	const data = await standalone({
		files: [replaceBackslashes(path.join(__dirname, 'fixtures/broken-syntax/broken-syntax.css'))],
	});

	expect(data.results[0]).toMatchObject({
		parseErrors: [],
		errored: true,
		warnings: [
			{
				column: 1,
				line: 1,
				rule: 'CssSyntaxError',
				severity: 'error',
				text: 'Unexpected } (CssSyntaxError)',
			},
		],
	});
});

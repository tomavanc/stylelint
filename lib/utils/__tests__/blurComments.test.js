import blurComments from '../blurComments.js';

it('blurComments', () => {
	expect(blurComments('abc')).toBe('abc');
	expect(blurComments('/* abc */')).toBe('`');
	expect(blurComments('a { b:c } /*abc*/', '#')).toBe('a { b:c } #');
});

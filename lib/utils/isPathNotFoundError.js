import util from 'util';

/**
 * @param {unknown} error
 * @returns {error is NodeJS.ErrnoException}
 */
export default function isPathNotFoundError(error) {
	// @ts-expect-error -- TS2339: Property 'code' does not exist on type 'Error'.
	return util.types.isNativeError(error) && error.code === 'ENOENT';
}

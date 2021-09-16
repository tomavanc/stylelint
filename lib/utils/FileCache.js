import Debug from 'debug';
import fileEntryCache from 'file-entry-cache';
import getCacheFile from './getCacheFile.js';
import path from 'path';

const debug = Debug('stylelint:file-cache');

const DEFAULT_CACHE_LOCATION = './.stylelintcache';
const DEFAULT_HASH = '';

/** @typedef {import('file-entry-cache').FileDescriptor["meta"] & { hashOfConfig?: string }} CacheMetadata */

/**
 * @param {string} [cacheLocation]
 * @param {string} [hashOfConfig]
 * @constructor
 */
class FileCache {
	constructor(cacheLocation = DEFAULT_CACHE_LOCATION, hashOfConfig = DEFAULT_HASH) {
		const cacheFile = path.resolve(getCacheFile(cacheLocation, process.cwd()));

		debug(`Cache file is created at ${cacheFile}`);
		this._fileCache = fileEntryCache.create(cacheFile);
		this._hashOfConfig = hashOfConfig;
	}

	/**
	 * @param {string} absoluteFilepath
	 * @return {boolean}
	 */
	hasFileChanged(absoluteFilepath) {
		// Get file descriptor compares current metadata against cached
		// one and stores the result to "changed" prop.w
		const descriptor = this._fileCache.getFileDescriptor(absoluteFilepath);
		/** @type {CacheMetadata} */
		const meta = descriptor.meta || {};
		const changed = descriptor.changed || meta.hashOfConfig !== this._hashOfConfig;

		if (!changed) {
			debug(`Skip linting ${absoluteFilepath}. File hasn't changed.`);
		}

		// Mutate file descriptor object and store config hash to each file.
		// Running lint with different config should invalidate the cache.
		if (meta.hashOfConfig !== this._hashOfConfig) {
			meta.hashOfConfig = this._hashOfConfig;
		}

		return changed;
	}

	reconcile() {
		this._fileCache.reconcile();
	}

	destroy() {
		this._fileCache.destroy();
	}

	/**
	 * @param {string} absoluteFilepath
	 */
	removeEntry(absoluteFilepath) {
		this._fileCache.removeEntry(absoluteFilepath);
	}
}

export default FileCache;

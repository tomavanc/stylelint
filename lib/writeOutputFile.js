import path from 'path';
import stripAnsi from 'strip-ansi';
import writeFileAtomic from 'write-file-atomic';

/**
 * @param {string} content
 * @param {string} filePath
 * @returns {Promise<void>}
 */
export default (content, filePath) => writeFileAtomic(path.normalize(filePath), stripAnsi(content));

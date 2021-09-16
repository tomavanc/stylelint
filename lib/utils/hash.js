import murmur from 'imurmurhash';

/**
 * hash the given string
 * @param  {string} str the string to hash
 * @returns {string} the hash
 */
export default function hash(str) {
	return murmur(str).result().toString(36);
}

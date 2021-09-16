import merge from 'deepmerge';

export default function (...args) {
	return merge.all(args);
}

import compact from './compactFormatter.js';
import json from './jsonFormatter.js';
import string from './stringFormatter.js';
import tap from './tapFormatter.js';
import unix from './unixFormatter.js';
import verbose from './verboseFormatter.js';

const formatters = {
	compact,
	json,
	string,
	tap,
	unix,
	verbose,
};

export default formatters;

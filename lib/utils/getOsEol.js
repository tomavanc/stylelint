import os from 'os';

// This function simply provides roundabout way of getting os.EOL
// so we can mock this for Jest tests
function getOsEl() {
	return os.EOL;
}

export default getOsEl;

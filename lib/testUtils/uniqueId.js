let latestId = 0;

export default function uniqueId() {
	return ++latestId;
}

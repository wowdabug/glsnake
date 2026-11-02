const loggedKeys = new Set();

export function logOnce(key, msg) {
	if (!loggedKeys.has(key)) {
		loggedKeys.add(key);
		console.log(msg);
	}
}

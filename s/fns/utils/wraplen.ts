
export function wraplen(index: number, len: number) {
	return ((index % len) + len) % len
}


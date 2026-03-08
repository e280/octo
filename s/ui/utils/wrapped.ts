
export class Wrapped {
	#len
	#value

	constructor(value: number, len: number) {
		this.#value = value
		this.#len = len
	}

	get value() {
		return this.#value
	}

	set value(n: number) {
		this.#value = wrap(n, this.#len)
	}
}

function wrap(index: number, len: number) {
	return ((index % len) + len) % len
}


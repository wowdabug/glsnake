export class RingBuffer {
	#capacity;
	#head;
	#tail;
	#size;

	constructor(capacity) {
		this.buffer = new Float32Array(capacity);
		this.#capacity = capacity;
		this.#head = 0;
		this.#tail = 0;
		this.#size = 0;
	}

	getSize() {
		return this.#size >> 1;
	}

	push(x, y) {
		if (this.#capacity === (this.#size + 1)) {
			throw new Error("Buffer overflow");
		}

		this.buffer[this.#tail] = x;
		this.buffer[this.#tail + 1] = y;
		this.#tail = (this.#tail + 2) % this.#capacity;
		this.#size += 2;
	}

	shift() {
		const position = [this.buffer[this.#head], this.buffer[this.#head + 1]];
		this.buffer[this.#head] = undefined;
		this.buffer[this.#head + 1] = undefined;
		this.#head = (this.#head + 2) % this.#capacity;
		this.#size -= 2;
		return position;
	}
}

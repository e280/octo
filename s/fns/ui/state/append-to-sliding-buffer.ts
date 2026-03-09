
import {SlidingBuffer} from "./types.js"

export async function appendToSlidingBuffer(
		{$data, $length}: SlidingBuffer,
		incoming: Uint8Array,
	) {

	const data = $data()
	const length = $length()

	// if fit over overflow, keep tail
	if (incoming.length >= data.length) {
		data.set(incoming.subarray(incoming.length - data.length))
		await $length(data.length)
		await $data.publish()
		return
	}

	// identify which bytes will survive the left-slide
	//   [A,B,C,D,E,F] -- add "xxxx" and we get:
	//   [E,F,x,x,x,x]
	const nextLength = Math.min(data.length, length + incoming.length)
	const keepLen = nextLength - incoming.length
	if (keepLen > 0) {
		const keepStart = data.length - length + (length - keepLen)
		const targetStart = data.length - incoming.length - keepLen
		data.copyWithin(targetStart, keepStart, keepStart + keepLen)
	}

	// place incoming at the end
	data.set(incoming, data.length - incoming.length)

	// update signals
	await $length(nextLength)
	await $data.publish()
}


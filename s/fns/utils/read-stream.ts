
export async function readStream(
		stream: ReadableStream<Uint8Array>,
		onData: (data: Uint8Array) => void | Promise<void>,
	) {

	const reader = stream.getReader()

	try {
		while (true) {
			const {done, value} = await reader.read()
			if (done) break
			if (value) await onData(value)
		}
	}
	finally {
		reader.releaseLock()
	}
}


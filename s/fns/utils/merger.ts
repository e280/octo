
export function merger(
		dest: WritableStream<Uint8Array>,
		sources: ReadableStream<Uint8Array>[],
	) {

	return Promise.allSettled(
		sources.map(s => s.pipeTo(dest, {preventClose: true}))
	)
}



// TODO obsolete?
export function merger(
		dest: WritableStream<Uint8Array>,
		sources: ReadableStream<Uint8Array>[],
	) {

	return Promise.allSettled(
		sources.map(s => s.pipeTo(dest, {preventClose: true}))
	)
}

export async function mergeBytes(
		dest: WritableStream<Uint8Array>,
		sources: ReadableStream<Uint8Array>[],
	) {
	const writer = dest.getWriter()
	let chain = Promise.resolve()

	const write = (chunk: Uint8Array) => {
		chain = chain.then(async () => {
			await writer.ready
			await writer.write(chunk)
		})
		return chain
	}

	const pumps = sources.map(async source => {
		const reader = source.getReader()
		try {
			while (true) {
				const {value, done} = await reader.read()
				if (done) break
				await write(value!)
			}
		}
		catch {
			// shutdown/cancel is fine
		}
		finally {
			try { reader.releaseLock() } catch {}
		}
	})

	return Promise.allSettled(pumps).finally(() => {
		try { writer.releaseLock() } catch {}
	})
}


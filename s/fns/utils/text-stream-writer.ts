
import {txt} from "@e280/stz"

export function makeTextStreamWriter(stream: WritableStream<Uint8Array>) {
	const writer = stream.getWriter()
	return (...s: string[]) => writer.write(txt.toBytes(s.join("")))
}



import Stream from "node:stream"
import {pub, sub} from "@e280/stz"

import {executeShellNode} from "./execute-shell.js"
import {Context, ExitCode, KillSignal, ProcInternal} from "../../types.js"

export function makeNodeContext(): Context {
	const proc = {
		stdin: Stream.Readable.toWeb(process.stdin),
		stdout: Stream.Writable.toWeb(process.stdout),
		stderr: Stream.Writable.toWeb(process.stderr),
		exit: pub<[ExitCode]>(),
		onKill: sub<[KillSignal]>(),
		get rows() { return process.stdout.rows },
		get columns() { return process.stdout.columns },
		onResize: sub(),
		onKey: sub(),
	} satisfies ProcInternal

	process.stdout.on("resize", proc.onResize.pub)

	async function die() {
		process.stdin.setRawMode(false)
		process.stdin.pause()
		await proc.onKill.pub("SIGINT")
		await proc.exit(0)
	}

	process.stdin.setRawMode(true)
	process.stdin.resume()
	process.stdin.on("data", buf => {
		if (buf[0] === 3) die()
		proc.onKey.pub(buf.toString())
	})

	proc.exit.sub(exitCode => process.exit(exitCode))
	process.on("SIGTERM", () => proc.onKill.pub("SIGTERM"))
	process.on("SIGINT", () => proc.onKill.pub("SIGINT"))

	return {
		proc,
		executeShell: executeShellNode,
	}
}


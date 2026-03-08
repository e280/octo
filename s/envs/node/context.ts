
import Stream from "node:stream"
import {pub, sub} from "@e280/stz"

import {executeShellNode} from "./execute-shell.js"
import {Context, ExitCode, KillSignal, ProcInternal} from "../../types.js"

export function makeNodeContext(): Context {
	const proc = {
		get rows() { return process.stdout.rows },
		get columns() { return process.stdout.columns },
		stdout: Stream.Writable.toWeb(process.stdout),
		stderr: Stream.Writable.toWeb(process.stderr),
		exit: pub<[ExitCode]>(),
		onKey: sub(),
		onResize: sub(),
		onKill: sub<[KillSignal]>(),
	} satisfies ProcInternal

	process.stdout.on("resize", proc.onResize.pub)

	async function die(killSignal: KillSignal) {
		process.stdin.setRawMode(false)
		process.stdin.pause()
		await proc.onKill.pub(killSignal)
		await proc.exit(0)
	}

	process.stdin.setRawMode(true)
	process.stdin.resume()
	process.stdin.on("data", async buf => {
		if (buf[0] === 3) await die("SIGINT")
		proc.onKey.pub(buf.toString())
	})

	proc.exit.sub(exitCode => process.exit(exitCode))
	process.on("SIGTERM", () => die("SIGTERM"))
	process.on("SIGINT", () => die("SIGINT"))

	return {proc, executeShell: executeShellNode}
}


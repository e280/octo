
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
	} satisfies ProcInternal

	proc.exit.sub(exitCode => process.exit(exitCode))
	process.on("SIGTERM", () => proc.onKill.pub("SIGTERM"))
	process.on("SIGINT", () => proc.onKill.pub("SIGINT"))
	process.on("SIGKILL", () => proc.onKill.pub("SIGKILL"))

	return {
		proc,
		executeShell: executeShellNode,
	}
}


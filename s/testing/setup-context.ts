
import {pub, sub} from "@e280/stz"
import {Logger} from "@e280/sten"
import {Context, ExecuteShellFn, ProcInternal} from "../parts/types.js"

export function setupContext(
		executeShell: ExecuteShellFn
	) {

	return {
		executeShell,
		logger: new Logger().setWriter(Logger.writers.void()),
		proc: {
			stdin: new ReadableStream(),
			stdout: new WritableStream(),
			stderr: new WritableStream(),
			exit: pub(),
			onKill: sub(),
		} satisfies ProcInternal,
	} satisfies Context
}


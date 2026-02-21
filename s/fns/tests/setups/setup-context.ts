
import {pub, sub} from "@e280/stz"
import {Context, ExecuteShellFn, ProcInternal} from "../../../types.js"

export function setupContext(
		executeShell: ExecuteShellFn
	) {

	return {
		executeShell,
		proc: {
			stdin: new ReadableStream(),
			stdout: new WritableStream(),
			stderr: new WritableStream(),
			exit: pub(),
			onKill: sub(),
		} satisfies ProcInternal,
	} satisfies Context
}


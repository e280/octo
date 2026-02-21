
import {defer, pub, sub} from "@e280/stz"
import {ExitCode, KillSignal, ProcExternal, ProcInternal} from "../../../types.js"

export function mockProc() {
	const stdin = new TransformStream<Uint8Array, Uint8Array>()
	const stdout = new TransformStream<Uint8Array, Uint8Array>()
	const stderr = new TransformStream<Uint8Array, Uint8Array>()
	const onKill = sub<[KillSignal]>()
	const deferredExitCode = defer<ExitCode>()
	const exit = pub(deferredExitCode.resolve)

	const internal = {
		stdin: stdin.readable,
		stdout: stdin.writable,
		stderr: stderr.writable,
		onKill,
		exit,
	} satisfies ProcInternal

	const external = {
		stdin: stdin.writable,
		stdout: stdout.readable,
		stderr: stderr.readable,
		kill: onKill.pub,
		exitCode: deferredExitCode.promise,
	} satisfies ProcExternal

	return {internal, external}
}


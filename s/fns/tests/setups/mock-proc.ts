
import {defer, pub, sub} from "@e280/stz"
import {ExitCode, KillSignal, ProcExternal, ProcInternal} from "../../../types.js"

let pidCount = 100

export function mockProc() {
	const pid = pidCount++
	const label = "node mock.js --fake process"

	const stdout = new TransformStream<Uint8Array, Uint8Array>()
	const stderr = new TransformStream<Uint8Array, Uint8Array>()
	const onKill = sub<[KillSignal]>()
	const deferredExitCode = defer<ExitCode>()
	const exit = pub(deferredExitCode.resolve)
	const onResize = sub()
	const onKey = sub<[key: string]>()

	const internal = {
		pid,
		command: label,
		stdout: stdout.writable,
		stderr: stderr.writable,
		onKill,
		exit,
		rows: 80,
		columns: 80,
		onResize,
		onKey,
	} satisfies ProcInternal

	const external = {
		pid,
		command: label,
		stdout: stdout.readable,
		stderr: stderr.readable,
		kill: onKill.pub,
		exitCode: deferredExitCode.promise,
	} satisfies ProcExternal

	return {internal, external}
}


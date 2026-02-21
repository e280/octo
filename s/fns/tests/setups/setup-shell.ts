
import {defer, sub} from "@e280/stz"
import {KillSignal, ExecuteShellFn, ExitCode, ProcInternal} from "../../../types.js"

export function setupShell(
		commands: Record<string, (proc: ProcInternal) => Promise<ExitCode>>
	): ExecuteShellFn {

	return (command: string) => {
		const fn = commands[command]
		if (!fn) throw new Error(`mock fn not found for shell command "${command}"`)

		const stdin = new TransformStream<Uint8Array>()
		const stdout = new TransformStream<Uint8Array>()
		const stderr = new TransformStream<Uint8Array>()
		const onKill = sub<[KillSignal]>()
		const deferredExitCode = defer<ExitCode>()

		const internal: ProcInternal = {
			stdin: stdin.readable,
			stdout: stdin.writable,
			stderr: stderr.writable,
			onKill,
			exit: deferredExitCode.resolve,
		}

		fn(internal)
			.then(deferredExitCode.resolve)
			.catch(deferredExitCode.reject)

		return {
			stdin: stdin.writable,
			stdout: stdout.readable,
			stderr: stderr.readable,
			kill: onKill.pub,
			exitCode: deferredExitCode.promise,
		}
	}
}


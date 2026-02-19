
import Stream from "node:stream"
import {spawn} from "node:child_process"
import {ExecuteShellFn, ExitCode} from "../../parts/types.js"

export const executeShellNode: ExecuteShellFn = command => {
	const child = spawn(command, {shell: true})

	return {
		stdin: Stream.Writable.toWeb(child.stdin),
		stdout: Stream.Readable.toWeb(child.stdout),
		stderr: Stream.Readable.toWeb(child.stderr),

		kill: signal => child.kill(signal),

		exitCode: new Promise<ExitCode>(resolve => {
			child.on("close", code => resolve(code ?? 1))
		}),
	}
}


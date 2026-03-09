
import Stream from "node:stream"
import {resolve} from "node:path"
import {spawn} from "node:child_process"
import {ExecuteShellFn, ExitCode, ProcExternal} from "../../types.js"

export const executeShellNode: ExecuteShellFn = command => {
	const child = spawn(command, {
		shell: true,
		env: {
			...process.env,
			PATH: `${resolve("node_modules/.bin")}:${process.env.PATH}`,
			FORCE_COLOR: "1",
			CLICOLOR_FORCE: "1",
			TERM: process.env.TERM ?? "xterm-256color",
		},
	})

	return {
		command,
		pid: child.pid!,
		stdout: Stream.Readable.toWeb(child.stdout),
		stderr: Stream.Readable.toWeb(child.stderr),
		kill: signal => child.kill(signal),
		exitCode: new Promise<ExitCode>(resolve => {
			child.on("close", code => resolve(code ?? 1))
		}),
	} satisfies ProcExternal
}


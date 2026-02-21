
import {Context} from "../types.js"

export async function sequence(context: Context, commands: string[]) {
	for (const command of commands) {

		// spawn child process
		const proc = context.executeShell(command)

		// forward stdout and stderr from child to parent
		proc.stdout.pipeTo(context.proc.stdout, {preventClose: true}).catch(() => {})
		proc.stderr.pipeTo(context.proc.stderr, {preventClose: true}).catch(() => {})

		// forward kill signals
		const stop = context.proc.onKill(proc.kill)

		// wait for process to finish
		const exitCode = await proc.exitCode
		stop()

		// if the child fails, we exit early with its code
		if (exitCode !== 0)
			return context.proc.exit(exitCode)
	}

	// exit with success when nothing has failed
	return context.proc.exit(0)
}


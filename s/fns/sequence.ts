
import {Context} from "../types.js"

export async function sequence(context: Context, commands: string[]) {
	const {proc, executeShell} = context

	for (const command of commands) {

		// spawn child process
		const child = executeShell(command)

		// forward stdout and stderr from child to parent
		child.stdout.pipeTo(proc.stdout, {preventClose: true}).catch(() => {})
		child.stderr.pipeTo(proc.stderr, {preventClose: true}).catch(() => {})

		// forward kill signals
		const stop = proc.onKill(child.kill)

		// wait for process to finish
		const exitCode = await child.exitCode
		stop()

		// if the child fails, we exit early with its code
		if (exitCode !== 0)
			return proc.exit(exitCode)
	}

	// exit with success when nothing has failed
	return proc.exit(0)
}


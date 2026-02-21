
import {Context} from "../types.js"
import {merger} from "./utils/merger.js"

export async function parallel(context: Context, commands: string[]) {

	// execute all shell commands concurrently
	const procs = commands.map(command => context.executeShell(command))

	// forward stdout and stderr from all child processes to parent process
	merger(context.proc.stdout, procs.map(p => p.stdout))
	merger(context.proc.stderr, procs.map(p => p.stderr))

	// forward kill signals
	const stop = context.proc.onKill(signal => procs.forEach(p => p.kill(signal)))

	// await the execution of everything
	const exitCodes = await Promise.all(procs.map(p => p.exitCode))
	stop()

	// exit
	const success = exitCodes.every(code => code === 0)
	return context.proc.exit(success ? 0 : 1)
}


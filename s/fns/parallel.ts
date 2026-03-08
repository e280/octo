
import {Context} from "../types.js"
import { forwardKillSignals } from "./utils/forward-kill-signals.js"
import {mergeBytes} from "./utils/merger.js"

export async function parallel(context: Context, commands: string[]) {
	const {proc, executeShell} = context

	// execute all shell commands concurrently
	const children = commands.map(command => executeShell(command))

	// forward stdout and stderr from all child processes to parent process
	mergeBytes(proc.stdout, children.map(p => p.stdout))
	mergeBytes(proc.stderr, children.map(p => p.stderr))

	const stop = forwardKillSignals(proc, children)

	// await the execution of everything
	const exitCodes = await Promise.all(children.map(p => p.exitCode))
	stop()

	// exit
	const success = exitCodes.every(code => code === 0)
	return context.proc.exit(success ? 0 : 1)
}



import {Context} from "../types.js"
import {forwardOutputsToParent} from "./utils/forward-outputs-to-parent.js"

export async function sequence(context: Context, commands: string[]) {
	const {proc, executeShell} = context

	for (const command of commands) {
		const child = executeShell(command)
		forwardOutputsToParent(child, proc)
		proc.onKill(child.kill)

		// wait for process to finish
		const exitCode = await child.exitCode

		if (exitCode !== 0)
			return proc.exit(exitCode)
	}

	return proc.exit(0)
}


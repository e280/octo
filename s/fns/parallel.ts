
import {Context} from "../types.js"
import {waitForAllExits} from "./utils/wait-for-all-exits.js"
import {startConcurrently} from "./utils/start-concurrently.js"
import {forwardKillSignals} from "./utils/forward-kill-signals.js"
import {forwardOutputsToParent} from "./utils/forward-outputs-to-parent.js"

export async function parallel(context: Context, commands: string[]) {
	const {proc, executeShell} = context

	const children = startConcurrently(executeShell, commands)
	forwardKillSignals(children, proc)
	forwardOutputsToParent(children, proc)

	const exitCodes = await waitForAllExits(children)
	const success = exitCodes.every(code => code === 0)
	context.proc.exit(success ? 0 : 1)
}


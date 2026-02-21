
import {ExitCode} from "../../../types.js"
import {setupShell} from "./setup-shell.js"
import {setupContext} from "./setup-context.js"

export function setupOptions(
		alpha: () => Promise<ExitCode>,
		bravo: () => Promise<ExitCode>,
	) {

	const executeShell = setupShell({alpha, bravo})

	const context = setupContext(executeShell)

	return [context, ["alpha", "bravo"]] as [typeof context, string[]]
}


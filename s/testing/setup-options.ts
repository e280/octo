
import {ExitCode} from "../parts/types.js"
import {setupShell} from "./setup-shell.js"
import {setupContext} from "./setup-context.js"

export function setupOptions(
		a: () => Promise<ExitCode>,
		b: () => Promise<ExitCode>,
	) {

	const context = setupContext(
		setupShell({a, b})
	)

	const options = {
		context,
		params: {"npm-run": false},
		extraArgs: ["a", "b"],
	}

	return options
}


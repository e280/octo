
import {ExecuteShellFn} from "../../types.js"

export function startConcurrently(
		executeShell: ExecuteShellFn,
		commands: string[],
	) {

	return commands.map(command => executeShell(command))
}


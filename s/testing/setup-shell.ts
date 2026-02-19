
import {ExecuteShellFn, ExitCode} from "../parts/types.js"

export function setupShell(
		commands: Record<string, () => Promise<ExitCode>>
	): ExecuteShellFn {

	return async(shelltext: string) => {
		const fn = commands[shelltext]
		if (!fn) throw new Error(`mock fn not found for shell command "${shelltext}"`)
		return fn()
	}
}


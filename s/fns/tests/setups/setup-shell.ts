
import {MockProcFn} from "./types.js"
import {mockProc} from "./mock-proc.js"
import {ExecuteShellFn} from "../../../types.js"

export function setupShell(
		commands: Record<string, MockProcFn>
	): ExecuteShellFn {

	return (command: string) => {
		const fn = commands[command]
		if (!fn) throw new Error(`mock fn not found for shell command "${command}"`)

		const {internal, external} = mockProc()

		fn(internal)
			.then(internal.exit)
			.catch(() => internal.exit(1))

		return external
	}
}


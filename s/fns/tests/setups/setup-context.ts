
import {mockProc} from "./mock-proc.js"
import {Context, ExecuteShellFn} from "../../../types.js"

export function setupContext(
		executeShell: ExecuteShellFn
	) {

	const {internal, external} = mockProc()

	return {
		executeShell,
		proc: internal,
		external,
	} satisfies Context & Record<string, any>
}


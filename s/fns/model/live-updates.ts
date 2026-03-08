
import {ProcessView} from "./types.js"
import {ProcExternal} from "../../types.js"

export function liveUpdates(proc: ProcExternal, view: ProcessView) {
	proc.stdout.getReader()
	proc.stderr.getReader()
	proc.exitCode.then(exitCode => {
		view.$indicator.value = exitCode === 0 ? "◦" : "x"
	})
}


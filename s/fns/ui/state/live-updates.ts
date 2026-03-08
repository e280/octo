
import {ProcessView} from "./types.js"
import {ProcExternal} from "../../../types.js"

export function liveUpdates(proc: ProcExternal, view: ProcessView) {
	proc.stdout.getReader()
	proc.stderr.getReader()
	proc.exitCode.then(exitCode => {
		view.$status.value = (
			exitCode === 0
				? "done"
				: "failed"
		)
	})
}


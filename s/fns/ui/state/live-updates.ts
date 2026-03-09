
import {ProcessView} from "./types.js"
import {ProcExternal} from "../../../types.js"
import {readStream} from "../../utils/read-stream.js"

export function liveUpdates(proc: ProcExternal, view: ProcessView) {
	readStream(proc.stdout, async data => {
		view.$data.value.push(data)
		await view.$data.publish()
		await view.$status("happy")
	})

	readStream(proc.stderr, async data => {
		view.$data.value.push(data)
		await view.$data.publish()
		await view.$status("angry")
	})

	proc.exitCode.then(exitCode => {
		view.$status.value = (
			exitCode === 0
				? "done"
				: "failed"
		)
	})
}


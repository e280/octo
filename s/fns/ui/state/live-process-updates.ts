
import {ProcessView} from "./types.js"
import {ProcExternal} from "../../../types.js"
import {readStream} from "../../utils/read-stream.js"
import {appendToSlidingBuffer} from "./append-to-sliding-buffer.js"

export function liveProcessUpdates(proc: ProcExternal, view: ProcessView) {
	readStream(proc.stdout, async data => {
		await appendToSlidingBuffer(view.slidingBuffer, data)
		await view.$status("happy")
	})

	readStream(proc.stderr, async data => {
		await appendToSlidingBuffer(view.slidingBuffer, data)
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


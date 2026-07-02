
import {ProcessView} from "./types.js"
import {ProcExternal} from "../../../types.js"
import {readStream} from "../../utils/read-stream.js"
import {appendToSlidingBuffer} from "./append-to-sliding-buffer.js"

export function liveProcessUpdates(proc: ProcExternal, view: ProcessView) {
	readStream(proc.stdout, data => {
		appendToSlidingBuffer(view.slidingBuffer, data)
		view.$status("happy")
	})

	readStream(proc.stderr, data => {
		appendToSlidingBuffer(view.slidingBuffer, data)
		view.$status("angry")
	})

	proc.exitCode.then(exitCode => {
		view.$status(
			exitCode === 0
				? "done"
				: "failed"
		)
	})
}


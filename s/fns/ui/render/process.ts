
import {txt} from "@e280/stz"
import {ProcessView} from "../state/types.js"
import {getSlidingBufferContent} from "../state/get-sliding-buffer-content.js"

export function renderProcess(view: ProcessView) {
	const data = getSlidingBufferContent(view.slidingBuffer)
	return txt(data)
}


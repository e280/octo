
import {State} from "../state/types.js"
import {ansi} from "../../utils/ansi.js"
import {renderFooter} from "./footer.js"
import {ProcInternal} from "../../../types.js"
import {getCurrentView} from "../state/get-current-view.js"

export function render(proc: ProcInternal, state: State) {
	const view = getCurrentView(state)

	return [
		ansi.clear,
		view.kind === "dashboard"
			? "dashboard"
			: "process",
		renderFooter(proc, state),
		ansi.hideCursor,
	].join("")
}


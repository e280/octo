
import {State} from "../state/types.js"
import {ansi} from "../../utils/ansi.js"
import {renderFooter} from "./footer.js"
import {renderProcess} from "./process.js"
import {ProcInternal} from "../../../types.js"
import {getCurrentView} from "../state/get-current-view.js"

export function render(proc: ProcInternal, state: State) {
	const view = getCurrentView(state)
	return [
		ansi.clear,
		ansi.reset.all,
		view.kind === "dashboard"
			? "octo dashboard coming soon lol"
			: renderProcess(view),
		renderFooter(proc, state),
	].join("")
}


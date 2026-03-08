
import {signal} from "@e280/strata"
import {State} from "./types.js"
import {liveUpdates} from "./live-updates.js"
import {makeProcessView} from "./make-process-view.js"
import {makeDashboardView} from "./make-dashboard-view.js"
import {ProcExternal, ProcInternal} from "../../../types.js"

export function makeLivingState(proc: ProcInternal, children: ProcExternal[]): State {
	const dashboardView = makeDashboardView(proc)

	const processViews = children.map(child => {
		const view = makeProcessView(child)
		liveUpdates(child, view)
		return view
	})

	const $rows = signal(proc.rows)
	const $columns = signal(proc.columns)

	proc.onResize(() => {
		$rows(proc.rows)
		$columns(proc.columns)
	})

	return {
		$rows,
		$columns,
		$index: signal(0),
		views: [dashboardView, ...processViews],
	}
}


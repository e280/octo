
import {txt} from "@e280/stz"
import {effect, signal} from "@e280/strata"
import {Context} from "../types.js"
import {State} from "./model/types.js"
import {liveUpdates} from "./model/live-updates.js"
import {makeProcessView} from "./model/make-process-view.js"
import {startConcurrently} from "./utils/start-concurrently.js"
import {makeDashboardView} from "./model/make-dashboard-view.js"
import {forwardKillSignals} from "./utils/forward-kill-signals.js"
import {color} from "./utils/colors.js"
import {addIndex} from "./model/add-index.js"

export async function ui(context: Context, commands: string[]) {
	const {proc, executeShell} = context
	const children = startConcurrently(executeShell, commands)
	forwardKillSignals(children, proc)

	const dashboardView = makeDashboardView(proc)

	const processViews = children.map((child, i) => {
		const view = makeProcessView(child, i.toString())
		liveUpdates(child, view)
		return view
	})

	const state: State = {
		$index: signal(0),
		views: [dashboardView, ...processViews],
	}

	const stdoutWriter = context.proc.stdout.getWriter()
	const out = (s: string) => stdoutWriter.write(txt.toBytes(s))

	function footer() {
		const tabs = state.views.map((view, index) => {
			if (view.kind === "dashboard") return index === state.$index.value
				? `(${view.sigil})`
				: ` ${view.sigil} `
			else return index === state.$index.value
				? `(${view.sigil}${view.$indicator()})`
				: ` ${view.sigil}${view.$indicator()} `
		}).join("")
		return color.bg.x(237) + `  🐙 ${tabs} ` + color.reset.all + `\n`
	}

	function render() {
		out(footer())
	}

	render()
	proc.onKill(() => process.exit(0))

	proc.onKey(key => {
		if (key === "]") addIndex(state, 1)
		if (key === "[") addIndex(state, -1)
	})

	effect(render)

	setInterval(() => {}, 1000)
}


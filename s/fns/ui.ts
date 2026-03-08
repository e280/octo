
import {txt} from "@e280/stz"
import {effect} from "@e280/strata"
import {Context} from "../types.js"
import {ansi} from "./utils/ansi.js"
import {addIndex} from "./ui/model/add-index.js"
import {renderFooter} from "./ui/render/footer.js"
import {makeLivingState} from "./ui/model/make-living-state.js"
import {startConcurrently} from "./utils/start-concurrently.js"
import {forwardKillSignals} from "./utils/forward-kill-signals.js"

export async function ui(context: Context, commands: string[]) {
	const {proc, executeShell} = context

	const children = startConcurrently(executeShell, commands)
	forwardKillSignals(children, proc)

	const state = makeLivingState(proc, children)
	const stdoutWriter = proc.stdout.getWriter()
	const out = (s: string) => stdoutWriter.write(txt.toBytes(s))

	function render() {
		out(ansi.clear + ansi.hideCursor)
		out(ansi.cursor(proc.rows, 1))
		out(renderFooter(state))
	}

	proc.onKill(() => {
		out(ansi.showCursor)
		process.exit(0)
	})

	proc.onKey(key => {
		if (key === "]") addIndex(state, 1)
		if (key === "[") addIndex(state, -1)
	})

	effect(render)
	setInterval(() => {}, 1000)
}



import {txt} from "@e280/stz"
import {effect} from "@e280/strata"
import {Context} from "../types.js"
import {ansi} from "./utils/ansi.js"
import {render} from "./ui/render/render.js"
import {addIndex} from "./ui/state/add-index.js"
import {makeLivingState} from "./ui/state/make-living-state.js"
import {startConcurrently} from "./utils/start-concurrently.js"
import {forwardKillSignals} from "./utils/forward-kill-signals.js"

export async function ui(context: Context, commands: string[]) {
	const {proc, executeShell} = context

	const children = startConcurrently(executeShell, commands)
	forwardKillSignals(children, proc)

	const state = makeLivingState(proc, children)
	const stdoutWriter = proc.stdout.getWriter()
	const out = (s: string) => stdoutWriter.write(txt.toBytes(s))

	proc.onKill(() => {
		out(ansi.showCursor)
		process.exit(0)
	})

	proc.onKey(key => {
		if (key === "]") addIndex(state, 1)
		if (key === "[") addIndex(state, -1)
	})

	effect(() => out(render(proc, state)))
	setInterval(() => {}, 1000)
}


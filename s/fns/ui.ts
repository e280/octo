
import {effect} from "@e280/strata"
import {Context} from "../types.js"
import {ansi} from "./utils/ansi.js"
import {hotkeys} from "./utils/hotkeys.js"
import {render} from "./ui/render/render.js"
import {setIndex} from "./ui/state/set-index.js"
import {addIndex} from "./ui/state/add-index.js"
import {makeLivingState} from "./ui/state/make-living-state.js"
import {startConcurrently} from "./utils/start-concurrently.js"
import {forwardKillSignals} from "./utils/forward-kill-signals.js"
import {makeTextStreamWriter} from "./utils/text-stream-writer.js"

export async function ui(context: Context, commands: string[]) {
	const {proc, executeShell} = context

	const children = startConcurrently(executeShell, commands)
	forwardKillSignals(children, proc)

	const state = makeLivingState(proc, children)
	const write = makeTextStreamWriter(proc.stdout)

	async function exit() {
		await write(
			ansi.cursorShow,
			ansi.clear,
			// ansi.altScreenLeave,
		)
		process.exit(0)
	}

	proc.onKill(exit)

	proc.onKey(async key => {
		if (hotkeys.next.includes(key)) addIndex(state, 1)
		if (hotkeys.prev.includes(key)) addIndex(state, -1)
		if (hotkeys.quit.includes(key)) await exit()
		if (key === "0") setIndex(state, 0)
		if (key === "1") setIndex(state, 1)
		if (key === "2") setIndex(state, 2)
		if (key === "3") setIndex(state, 3)
		if (key === "4") setIndex(state, 4)
		if (key === "5") setIndex(state, 5)
		if (key === "6") setIndex(state, 6)
		if (key === "7") setIndex(state, 7)
		if (key === "8") setIndex(state, 8)
		if (key === "9") setIndex(state, 9)
	})

	setIndex(state, 1)

	await write(
		// ansi.altScreenEnter,
		ansi.clear,
		ansi.cursorHide,
	)

	effect(() => write(render(proc, state)))
	setInterval(() => {}, 1000)
}


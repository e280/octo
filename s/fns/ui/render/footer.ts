
import stringWidth from "string-width"
import {State} from "../state/types.js"
import {ansi} from "../../utils/ansi.js"
import {indicator} from "./indicator.js"
import {ProcInternal} from "../../../types.js"
import {getCurrentView} from "../state/get-current-view.js"

export function renderFooter(proc: ProcInternal, state: State) {
	const vibe = makeFooterVibes()

	const left = renderTabs(state, vibe)
	const leftWidth = stringWidth(left)

	const availableRight = Math.max(0, state.$columns() - leftWidth)
	const right = renderRightInfo(state, vibe, availableRight)

	const spaces = " ".repeat(
		Math.max(0, state.$columns() - leftWidth - stringWidth(right))
	)

	return [
		ansi.cursor(proc.rows, 1),
		left,
		vibe.plain(spaces),
		right,
	].join("")
}

function makeFooterVibes() {
	const bg = ansi.bg.x(234)
	const bgSelected = ansi.bg.x(237)

	return {
		plain: ansi.combo(bg),
		angry: ansi.combo(bg, ansi.bright.red),
		pid: ansi.combo(bg, ansi.dim, ansi.blue),
		cmd: ansi.combo(bg, ansi.blue),

		sel: ansi.combo(bgSelected),
		selStar: ansi.combo(bgSelected, ansi.dim),
		selAngry: ansi.combo(bgSelected, ansi.bright.red),
	}
}

function renderTabs(state: State, vibe: ReturnType<typeof makeFooterVibes>) {
	return state.views.map((view, index) => {
		const isActive = index === state.$index.value
		const isAngry = ["angry", "failed"].includes(view.$status())
		const sigil = index === 0 ? "🐙" : index.toString()
		const chunk = view.kind === "dashboard"
			? sigil
			: sigil + indicator(view.$status())

		if (isActive) {
			return vibe.selStar("*") +
				(isAngry ? vibe.selAngry : vibe.sel)(chunk + " ")
		}

		return (isAngry ? vibe.angry : vibe.plain)(` ${chunk} `)
	}).join("")
}

function renderRightInfo(
		state: State,
		vibe: ReturnType<typeof makeFooterVibes>,
		available: number,
	) {

	const view = getCurrentView(state)

	if (view.kind === "process") {
		return chooseThatFits(available, [
			vibe.pid(`${view.pid}`) + vibe.cmd(` ${view.command} `),
			vibe.pid(`${view.pid}`) + vibe.cmd(` ${truncate(view.command, 16)} `),
			vibe.pid(`${view.pid} `),
		])
	}

	return chooseThatFits(available, [
		vibe.pid(`${view.pid}`) + vibe.cmd(` octo `),
		vibe.pid(`${view.pid} `),
	])
}

function chooseThatFits(available: number, options: string[]) {
	for (const option of options) {
		if (stringWidth(option) + 4 < available)
			return option
	}
	return ""
}

function truncate(text: string, max: number) {
	return text.length <= max
		? text
		: text.slice(0, max) + "..."
}


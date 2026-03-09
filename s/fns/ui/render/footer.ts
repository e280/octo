
import stringWidth from "string-width"
import {State} from "../state/types.js"
import {ansi} from "../../utils/ansi.js"
import {indicator} from "./indicator.js"
import {ProcInternal} from "../../../types.js"
import {getCurrentView} from "../state/get-current-view.js"

export function renderFooter(proc: ProcInternal, state: State) {
	const cursorPosition = ansi.cursor(proc.rows, 1)
	const bg = ansi.bg.x(234)
	const selectedBg = ansi.bg.x(237)

	const plainVibe = ansi.combo(bg)
	const angryVibe = ansi.combo(bg, ansi.bright.red)
	const pidVibe = ansi.combo(bg, ansi.dim, ansi.blue)
	const commandVibe = ansi.combo(bg, ansi.blue)

	const starVibe = ansi.combo(selectedBg, ansi.dim)
	const selectedVibe = ansi.combo(selectedBg)
	const selectedAngryVibe = ansi.combo(selectedBg, ansi.bright.red)

	const tabs = state.views.map((view, index) => {
		const isActive = index === state.$index.value
		const sigil = index === 0
			? "🐙"
			: index.toString()
		const isAngry = ["angry", "failed"].includes(view.$status())
		const chunk = (view.kind === "dashboard")
			? sigil
			: sigil + indicator(view.$status())
		return isActive
			? starVibe("*") + (isAngry ? selectedAngryVibe : selectedVibe)(chunk + " ")
			: (isAngry ? angryVibe : plainVibe)(` ${chunk} `)
	}).join("")

	const col = state.$columns()
	const content = tabs
	const tabsWidth = stringWidth(tabs)
	const rightSpace = col - tabsWidth

	let right = ""
	const view = getCurrentView(state)
	const fits = (s: string) => (rightSpace > (stringWidth(s) + 4))
	if (view.kind === "process") {
		const info = pidVibe(`${view.pid}`) + commandVibe(` ${view.command} `)
		const info2 = pidVibe(`${view.pid}`) + commandVibe(` ${view.command.slice(0, 16)}... `)
		const info3 = pidVibe(`${view.pid} `)
		if (fits(info)) right = info
		else if (fits(info2)) right = info2
		else if (fits(info3)) right = info3
	}
	else {
		const info = pidVibe(`${view.pid}`) + commandVibe(` ${"octo"} `)
		const info2 = pidVibe(`${view.pid} `)
		if (fits(info)) right = info
		else if (fits(info2)) right = info2
	}

	const spaces = " ".repeat(col - (tabsWidth + stringWidth(right)))
	return cursorPosition + content + plainVibe(spaces) + right
}



import stringWidth from "string-width"
import {State} from "../model/types.js"
import {ansi} from "../../utils/ansi.js"
import {indicator} from "./indicator.js"

export function renderFooter(state: State) {
	const bg = ansi.bg.x(234)
	const selectedBg = ansi.bg.x(237)

	const plainVibe = ansi.combo(bg)
	const angryVibe = ansi.combo(bg, ansi.bright.red)

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

	const content = tabs
	const width = stringWidth(tabs)
	const spaces = " ".repeat(state.$columns() - width)

	return content + plainVibe(spaces)
}


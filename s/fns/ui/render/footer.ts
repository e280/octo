
import stringWidth from "string-width"
import {State} from "../model/types.js"
import {ansi} from "../../utils/ansi.js"
import {indicator} from "./indicator.js"

export function renderFooter(state: State) {
	const bg = ansi.bg.x(236)
	const brightBg = ansi.bg.x(239)

	const tabs = state.views.map((view, index) => {
		const sigil = index === 0
			? "🐙"
			: index.toString()
		const isActive = index === state.$index.value
		const isHappy = ["happy", "done"].includes(view.$status())
		const color = isHappy ? "" : ansi.bright.red
		const bit = (view.kind === "dashboard")
			? sigil
			: sigil + indicator(view.$status())
		const tab = isActive
			? brightBg + `*${bit} `
			: ` ${bit} `

		return (
			bg +
			color +
			tab +
			ansi.reset.all
		)
	}).join("")

	const content = bg + tabs
	const width = stringWidth(content)
	const spaces = bg + " ".repeat(state.$columns() - width)

	return content + spaces + ansi.reset.all
}


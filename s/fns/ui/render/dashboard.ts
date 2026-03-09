
import {ansi} from "../../utils/ansi.js"

export function renderDashboard() {
	return [
		ansi.cyan + ansi.bold + "octo, tiny command orchestrator" + ansi.reset.all,
		ansi.blue + "https://github.com/e280/octo" + ansi.reset.all,
		"",
	].join("\n")
}


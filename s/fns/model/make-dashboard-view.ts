
import {DashboardView} from "./types.js"
import {ProcInternal} from "../../types.js"

export const makeDashboardView = (proc: ProcInternal): DashboardView => ({
	kind: "dashboard",
	pid: proc.pid,
	command: "octo",
	sigil: "s",
	indicator: "•",
})



import {signal} from "@e280/strata"
import {ProcInternal} from "../../../types.js"
import {DashboardView, Status} from "./types.js"

export const makeDashboardView = (proc: ProcInternal): DashboardView => ({
	kind: "dashboard",
	pid: proc.pid,
	command: "octo",
	sigil: "🐙",
	$status: signal<Status>("happy"),
})


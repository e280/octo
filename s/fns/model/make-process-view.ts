
import {signal} from "@e280/strata"
import {ProcessView} from "./types.js"
import {ProcExternal} from "../../types.js"

export const makeProcessView = (proc: ProcExternal, sigil: string): ProcessView => ({
	kind: "process",
	pid: proc.pid,
	command: proc.command,
	sigil,
	$indicator: signal("•"),
	$lines: signal<string[]>([]),
})


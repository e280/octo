
import {signal} from "@e280/strata"
import {ProcessView, Status} from "./types.js"
import {ProcExternal} from "../../../types.js"

export const makeProcessView = (proc: ProcExternal): ProcessView => ({
	kind: "process",
	pid: proc.pid,
	command: proc.command,
	$status: signal<Status>("happy"),
	slidingBuffer: {
		$data: signal<Uint8Array>(new Uint8Array(64 * 1024)),
		$length: signal(0),
	},
})


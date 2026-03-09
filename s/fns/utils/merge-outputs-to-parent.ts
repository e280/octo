
import {mergeBytes} from "./merger.js"
import {ProcExternal, ProcInternal} from "../../types.js"

export function mergeOutputsToParent(
		children: ProcExternal[],
		proc: ProcInternal,
	) {

	mergeBytes(proc.stdout, children.map(p => p.stdout))
	mergeBytes(proc.stderr, children.map(p => p.stderr))
}


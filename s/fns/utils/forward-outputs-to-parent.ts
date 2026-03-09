
import {ProcExternal, ProcInternal} from "../../types.js"

export function forwardOutputsToParent(
		child: ProcExternal,
		proc: ProcInternal,
	) {

	child.stdout.pipeTo(proc.stdout, {preventClose: true}).catch(() => {})
	child.stderr.pipeTo(proc.stderr, {preventClose: true}).catch(() => {})
}


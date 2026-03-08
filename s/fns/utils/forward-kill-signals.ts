
import {ProcExternal, ProcInternal} from "../../types.js"

export function forwardKillSignals(proc: ProcInternal, children: ProcExternal[]) {
	return proc.onKill(signal => children.forEach(p => p.kill(signal)))
}


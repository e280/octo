
import {ProcExternal, ProcInternal} from "../../types.js"

export function forwardKillSignals(
		children: ProcExternal[],
		proc: ProcInternal,
	) {
	return proc.onKill(signal => children.forEach(p => p.kill(signal)))
}


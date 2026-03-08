
import {ProcExternal} from "../../types.js"

export async function waitForAllExits(children: ProcExternal[]) {
	return Promise.all(children.map(p => p.exitCode))
}


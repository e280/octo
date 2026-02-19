
import {sub} from "@e280/stz"
import {Logger} from "@e280/sten"
import {spy} from "@e280/science"
import {Context, ExecuteShellFn} from "../parts/types.js"

export function setupContext(
		executeShell: ExecuteShellFn
	) {

	return {
		executeShell,
		onDeath: sub<[number]>(),
		pleaseExit: spy(async() => {}),
		logger: new Logger().setWriter(Logger.writers.void()),
	} satisfies Context
}


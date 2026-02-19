
import {Context} from "../parts/types.js"

export async function sequence({context, extraArgs, params}: {
		context: Context
		params: {"npm-run": boolean}
		extraArgs: string[]
	}) {

	for (const shelltext of extraArgs) {
		const exitCode = await context.executeShell(shelltext)

		if (exitCode !== 0) {
			await context.pleaseExit(exitCode)
			return
		}
	}
}


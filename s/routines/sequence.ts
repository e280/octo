
import {Context} from "../parts/types.js"

export async function sequence({context, extraArgs, params}: {
		context: Context
		params: {"npm-run": boolean}
		extraArgs: string[]
	}) {

	for (const command of extraArgs) {
		const proc = context.executeShell(command)
		const exitCode = await proc.exitCode

		if (exitCode !== 0)
			return context.proc.exit(exitCode)
	}
}


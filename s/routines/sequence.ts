
import {Context} from "../parts/types.js"
import {toNpmCommands} from "./utils/to-npm-commands.js"

export async function sequence({context, params, extraArgs}: {
		context: Context
		params: {"npm-run": boolean}
		extraArgs: string[]
	}) {

	const commands = params["npm-run"]
		? toNpmCommands(extraArgs)
		: extraArgs

	for (const command of commands) {
		const proc = context.executeShell(command)
		const exitCode = await proc.exitCode

		if (exitCode !== 0)
			return context.proc.exit(exitCode)
	}
}


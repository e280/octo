
import {Context} from "../parts/types.js"
import {toNpmCommands} from "./utils/to-npm-commands.js"

export async function parallel({context, extraArgs, params}: {
		context: Context
		extraArgs: string[]
		params: {
			"ui": boolean
			"npm-run": boolean
		}
	}) {

	if (params["ui"])
		throw new Error("TODO coming soon")

	const commands = params["npm-run"]
		? toNpmCommands(extraArgs)
		: extraArgs

	const exitCodes = await Promise.all(
		commands.map(
			async command => context.executeShell(command).exitCode
		)
	)

	return context.proc.exit(
		exitCodes.every(code => code === 0)
			? 0
			: 1
	)
}


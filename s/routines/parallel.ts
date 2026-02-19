
import {Context} from "../parts/types.js"

export async function parallel({context, extraArgs, params}: {
		context: Context
		params: {
			"ui": boolean
			"npm-run": boolean
		}
		extraArgs: string[]
	}) {

	if (params["ui"]) {}

	if (params["npm-run"]) {}

	context.logger.log("hello world, parallel", extraArgs)
}


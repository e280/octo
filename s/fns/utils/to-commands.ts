
import {pipe} from "@e280/stz"

export function toCommands(params: {"npm-run": boolean}, extraArgs: string[]) {
	return params["npm-run"]
		? extraArgs.map(toNpmScript)
		: extraArgs
}

export function toNpmScript(command: string) {
	return pipe(command)
		.to(s => s.trim())
		.to(s => {
			if (!s || !/^[a-zA-Z0-9._:+/-]+$/.test(s))
				throw new Error(`invalid npm script: ${s}`)
			else
				return s
		})
		.to(script => `npm run -s ${script}`)
		.done()
}


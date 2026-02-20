
export function toNpmCommands(extraArgs: string[]) {
	return extraArgs
		.map(script => script.trim())
		.map(script => {
			if (!script || !/^[a-zA-Z0-9._:+/-]+$/.test(script))
				throw new Error(`invalid npm script: ${script}`)
			else
				return script
		})
		.map(script => `npm run -s ${script}`)
}


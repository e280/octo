
import {param} from "@benev/argv"

export const cliCommons = {
	options: {
		name: "🐙 octo",
		help: `tiny command orchestrator.`,
		readme: "https://github.com/e280/octo",
	},
	command: {
		args: [],
		params: {
			"npm-run": param.flag("-n", {
				help: "treat commands as package.json scripts.",
			}),
		},
		extraArgs: {
			name: "commands",
			help: `commands to run all-at-once.`,
		},
	},
}


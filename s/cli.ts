#!/usr/bin/env node

import {Logger} from "@e280/sten"
import {cli, command, deathWithDignity, param} from "@benev/argv"

import {Context} from "./parts/types.js"
import {parallel} from "./routines/parallel.js"
import {sequence} from "./routines/sequence.js"

const context: Context = {
	...deathWithDignity(),
	executeShell: async() => 1,
	logger: new Logger()
		.setWriter(Logger.writers.console())
		.setShaper(Logger.shapers.errors()),
}

await cli(process.argv, {
	name: "🐙 octo",
	help: `tiny command orchestrator`,
	commands: {

		parallel: command({
			args: [],
			params: {
				"ui": param.flag("-u", {
					help: "fancy interactive process viewer tui",
				}),
				"npm-run": param.flag("-n", {
					help: "use npm run to execute package.json scripts",
				}),
			},
			extraArgs: {
				name: "commands",
				help: `commands to run all-at-once`,
			},

			async execute(o) {
				await parallel({context, ...o})
			},
		}),

		sequence: command({
			args: [],
			params: {
				"npm-run": param.flag("-n", {
					help: "use npm run to execute package.json scripts",
				}),
			},
			extraArgs: {
				name: "commands",
				help: `commands to run one-by-one`,
			},

			async execute(o) {
				await sequence({context, ...o})
			},
		}),
	},
}).execute()


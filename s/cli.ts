#!/usr/bin/env node

import {cli, command, param} from "@benev/argv"

import {sequence} from "./fns/sequence.js"
import {parallel} from "./fns/parallel.js"
import {toCommands} from "./fns/utils/to-commands.js"
import {makeNodeContext} from "./envs/node/context.js"

const context = makeNodeContext()

await cli(process.argv, {
	name: "🐙 octo",
	help: `tiny command orchestrator`,
	readme: "https://github.com/e280/octo",
	summarize: false,
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

			async execute({params, extraArgs}) {
				if (params["ui"]) throw new Error("TODO coming soon")
				else await parallel(context, toCommands(params, extraArgs))
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

			async execute({params, extraArgs}) {
				await sequence(context, toCommands(params, extraArgs))
			},
		}),
	},
}).execute()


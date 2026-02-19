#!/usr/bin/env node

import {cli, command, param} from "@benev/argv"

import {parallel} from "./routines/parallel.js"
import {sequence} from "./routines/sequence.js"
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


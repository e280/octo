#!/usr/bin/env node

import {cli, command} from "@benev/argv"

import {parallel} from "./fns/parallel.js"
import {cliCommons} from "./stuff/cli-commons.js"
import {toCommands} from "./fns/utils/to-commands.js"
import {makeNodeContext} from "./envs/node/context.js"

const context = makeNodeContext()

await cli(process.argv, {
	...cliCommons.options,
	commands: command({
		...cliCommons.command,
		help: "run commands all-at-once.",

		async execute({params, extraArgs}) {
			await parallel(context, toCommands(params, extraArgs))
		},
	}),
}).execute()


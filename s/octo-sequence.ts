#!/usr/bin/env node

import {cli, command} from "@benev/argv"

import {sequence} from "./fns/sequence.js"
import {cliCommons} from "./stuff/cli-commons.js"
import {toCommands} from "./fns/utils/to-commands.js"
import {makeNodeContext} from "./envs/node/context.js"

const context = makeNodeContext()

await cli(process.argv, {
	...cliCommons.options,
	commands: command({
		...cliCommons.command,
		help: "run commands one-at-a-time.",

		async execute({params, extraArgs}) {
			await sequence(context, toCommands(params, extraArgs))
		},
	}),
}).execute()


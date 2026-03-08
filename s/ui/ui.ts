
import {txt} from "@e280/stz"
import {Context} from "../types.js"
import {color} from "./utils/colors.js"
import {Wrapped} from "./utils/wrapped.js"

export async function ui(context: Context, commands: string[]) {
	const stdoutWriter = context.proc.stdout.getWriter()
	const out = (s: string) => stdoutWriter.write(txt.toBytes(s))

	class SplitView {
		constructor(public commands: string[]) {}
		render() {
			return this.commands
				.map(command => `split view ${command}\n`)
				.join("")
		}
	}

	class ProcessView {
		constructor(public command: string) {}
		render() {
			return `process view ${this.command}\n`
		}
	}

	const switcher = new class {
		views = [
			new SplitView(commands),
			...commands.map(command => new ProcessView(command)),
		]

		index = new Wrapped(0, this.views.length)

		render() {
			return this.views.at(this.index.value)!.render()
		}
	}

	const footer = new class {
		render() {
			const tabs = switcher.views.map((view, index) => {
				if (view instanceof SplitView) {
					return index === switcher.index.value
						? `(s)`
						: ` s `
				}
				else {
					return index === switcher.index.value
						? `(${index}•)`
						: ` ${index}• `
				}
			}).join("")
			return color.bg.x(237) + `  🐙 ${tabs}    23415 tsc -w` + color.reset.all + `\n`
		}
	}

	function draw() {
		out(switcher.render())
		out(footer.render())
	}

	draw()
	context.proc.onResize(draw)

	context.proc.onKey(key => {
		if (key === "]") switcher.index.value++
		if (key === "[") switcher.index.value--
		draw()
	})

	context.proc.onKill(() => process.exit(0))

	setInterval(() => {}, 1000)
}


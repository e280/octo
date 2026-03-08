
import {txt} from "@e280/stz"
import {Context} from "../types.js"
import {color} from "./parts/colors.js"

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
		#index = 0

		get index() { return this.#index }

		set index(n: number) {
			const len = commands.length
			this.#index = ((n % len) + len) % len
		}

		views = [
			new SplitView(commands),
			...commands.map(command => new ProcessView(command)),
		]

		render() {
			const view = this.views.at(this.#index) ?? this.views[0]
			return view.render()
		}
	}

	const footer = new class {
		render() {
			const tabs = switcher.views.map((view, index) => {
				if (view instanceof SplitView) {
					return index === switcher.index
						? `(s)`
						: ` s `
				}
				else {
					return index === switcher.index
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
		if (key === "]") switcher.index++
		if (key === "[") switcher.index--
		draw()
	})

	context.proc.onKill(() => process.exit(0))

	// do nothing, lol
	setInterval(() => {}, 1000)
}


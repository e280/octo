
import {defer} from "@e280/stz"
import {Science, test, expect, spy} from "@e280/science"

import {parallel} from "./parallel.js"
import {setupShell} from "../testing/setup-shell.js"
import {setupOptions} from "../testing/setup-options.js"
import {setupContext} from "../testing/setup-context.js"

export default Science.suite({
	"execute a and b": test(async() => {
		const deferred = defer()
		let started = 0
		let done = 0
		const a = spy(async() => {
			started++
			await deferred.promise
			done++
			return 0
		})
		const b = spy(async() => {
			started++
			await deferred.promise
			done++
			return 0
		})
		const promise = parallel(setupOptions(a, b))
		expect(started).is(2)
		expect(done).is(0)
		deferred.resolve()
		await promise
		expect(done).is(2)
	}),

	"exit 0 when all good": test(async() => {
		const a = spy(async() => 0)
		const b = spy(async() => 0)
		const options = setupOptions(a, b)
		let exitCode: number | null = null
		options.context.proc.exit.sub(code => { exitCode = code })
		await parallel(options)
		expect(exitCode).is(0)
	}),

	"exit 1 if any fail": test(async() => {
		const a = spy(async() => 0)
		const b = spy(async() => 1)
		const options = setupOptions(a, b)
		let exitCode: number | null = null
		options.context.proc.exit.sub(code => { exitCode = code })
		await parallel(options)
		expect(exitCode).is(1)
	}),

	"--npm-run runs npm scripts": test(async() => {
		const a = spy(async() => 0)
		const b = spy(async() => 0)
		await parallel({
			params: {"npm-run": true, ui: false},
			extraArgs: ["a", "b"],
			context: setupContext(setupShell({
				"npm run -s a": a,
				"npm run -s b": b,
			})),
		})
		expect(a.spy.calls.length).is(1)
		expect(b.spy.calls.length).is(1)
	}),
})


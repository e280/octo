
import {defer} from "@e280/stz"
import {Science, test, expect, spy} from "@e280/science"

import {parallel} from "../parallel.js"
import {setupOptions} from "./setups/setup-options.js"

export default Science.suite({
	"execute alpha and bravo": test(async() => {
		const deferred = defer()
		let started = 0
		let done = 0
		const alpha = spy(async() => {
			started++
			await deferred.promise
			done++
			return 0
		})
		const bravo = spy(async() => {
			started++
			await deferred.promise
			done++
			return 0
		})
		const promise = parallel(...setupOptions(alpha, bravo))
		expect(started).is(2)
		expect(done).is(0)
		deferred.resolve()
		await promise
		expect(done).is(2)
	}),

	"exit 0 when all good": test(async() => {
		const alpha = spy(async() => 0)
		const bravo = spy(async() => 0)
		const [context, commands] = setupOptions(alpha, bravo)
		let exitCode: number | null = null
		context.proc.exit.sub(code => { exitCode = code })
		await parallel(context, commands)
		expect(exitCode).is(0)
	}),

	"exit 1 if any fail": test(async() => {
		const alpha = spy(async() => 0)
		const bravo = spy(async() => 1)
		const [context, commands] = setupOptions(alpha, bravo)
		let exitCode: number | null = null
		context.proc.exit.sub(code => { exitCode = code })
		await parallel(context, commands)
		expect(exitCode).is(1)
	}),

	// // TODO figure out how to test this
	// "combine stdout": test.only(async() => {
	// 	const alpha = spy<MockProcFn>(async proc => {
	// 		proc.stdout.getWriter().write(txt.toBytes("hello"))
	// 		return 0
	// 	})
	// 	const bravo = spy(async proc => {
	// 		proc.stdout.getWriter().write(txt.toBytes("world"))
	// 		return 0
	// 	})
	// 	const [context, commands] = setupOptions(alpha, bravo)
	// 	await parallel(context, commands)
	// 	const {value} = await context.external.stdout.getReader().read()
	// 	const lol = value && txt.fromBytes(value)
	// 	expect(lol).ok()
	// }),
})


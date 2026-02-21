
import {Science, test, expect, spy} from "@e280/science"
import {sequence} from "../sequence.js"
import {setupOptions} from "./setups/setup-options.js"

export default Science.suite({
	"bravo after alpha": test(async() => {
		const alpha = spy(async() => 0)
		const bravo = spy(async() => {
			expect(alpha.spy.calls.length).is(1)
			return 0
		})
		await sequence(...setupOptions(alpha, bravo))
		expect(alpha.spy.calls.length).is(1)
		expect(bravo.spy.calls.length).is(1)
	}),

	"when alpha fails, bravo should not execute": test(async() => {
		const alpha = spy(async() => 1)
		const bravo = spy(async() => 0)
		await sequence(...setupOptions(alpha, bravo))
		expect(alpha.spy.calls.length).is(1)
		expect(bravo.spy.calls.length).is(0)
	}),

	"any command failure exits program with 1": test(async() => {
		const alpha = spy(async() => 1)
		const bravo = spy(async() => 0)
		const [context, commands] = setupOptions(alpha, bravo)
		let exited = 0
		context.proc.exit.sub(() => void exited++)
		await sequence(context, commands)
		expect(exited).is(1)
	}),
})


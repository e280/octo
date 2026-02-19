
import {Science, test, expect, spy} from "@e280/science"
import {sequence} from "./sequence.js"
import {setupOptions} from "../testing/setup-options.js"

export default Science.suite({
	"b after a": test(async() => {
		const a = spy(async() => 0)
		const b = spy(async() => {
			expect(a.spy.calls.length).is(1)
			return 0
		})
		await sequence(setupOptions(a, b))
		expect(a.spy.calls.length).is(1)
		expect(b.spy.calls.length).is(1)
	}),

	"when a fails, b should not execute": test(async() => {
		const a = spy(async() => 1)
		const b = spy(async() => 0)
		await sequence(setupOptions(a, b))
		expect(a.spy.calls.length).is(1)
		expect(b.spy.calls.length).is(0)
	}),

	"any command failure exits program with 1": test(async() => {
		const a = spy(async() => 1)
		const b = spy(async() => 0)
		const options = setupOptions(a, b)
		await sequence(options)
		expect(options.context.pleaseExit.spy.calls.length).is(1)
	}),
})


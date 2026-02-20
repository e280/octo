
import {Science, test, expect, spy} from "@e280/science"
import {sequence} from "./sequence.js"
import {setupShell} from "../testing/setup-shell.js"
import {setupContext} from "../testing/setup-context.js"
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
		let exited = 0
		options.context.proc.exit.sub(() => void exited++)
		await sequence(options)
		expect(exited).is(1)
	}),

	"--npm-run runs npm scripts": test(async() => {
		const a = spy(async() => 0)
		const b = spy(async() => 0)
		await sequence({
			params: {"npm-run": true},
			extraArgs: ["a", "b"],
			context: setupContext(setupShell({
				"npm run -s a": a,
				"npm run -s b": b,
			})),
		})
		expect(a.spy.calls.length).is(1)
		expect(b.spy.calls.length).is(1)
	}),

	"--npm-run rejects scripts with goofy characters": test(async() => {
		const goodies = ["a", "a-b", "a_b", "a+b", "a:b", "a/b"]
		const baddies = ["a b", "a;b", "a$b", "a@b", "a|b"]
		const script = (s: string) => ({
			params: {"npm-run": true},
			extraArgs: [s],
			context: setupContext(setupShell(
				Object.fromEntries([...goodies, ...baddies].map(s => [
					`npm run -s ${s}`,
					async() => 0,
				]))
			)),
		})
		for (const goodie of goodies)
			await expect(async() => sequence(script(goodie))).not.throwsAsync()
		for (const baddie of baddies)
			await expect(async() => sequence(script(baddie))).throwsAsync()
	}),
})


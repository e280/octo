
import {Science, test, expect} from "@e280/science"
import {toNpmScript} from "../utils/to-commands.js"

export default Science.suite({
	"npm scripts are forbidden from having goofy characters": test(async() => {
		const goodies = ["a", "a-b", "a_b", "a+b", "a:b", "a/b"]
		const baddies = ["a b", "a;b", "a$b", "a@b", "a|b"]
		for (const goodie of goodies)
			expect(toNpmScript(goodie)).is(`npm run -s ${goodie}`)
		for (const baddie of baddies)
			expect(() => toNpmScript(baddie)).throws()
	}),
})



import {Science, test, expect} from "@e280/science"

export default Science.suite({
	"addition works": test(async() => {
		expect(2 + 2).is(4)
	}),
})


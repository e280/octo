
import {Science} from "@e280/science"
import parallel from "./fns/tests/parallel.test.js"
import sequence from "./fns/tests/sequence.test.js"
import npmScripts from "./fns/tests/npm-scripts.test.js"

await Science.run({
	parallel,
	sequence,
	npmScripts,
})


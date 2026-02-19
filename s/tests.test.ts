
import {Science} from "@e280/science"
import parallel from "./routines/parallel.test.js"
import sequence from "./routines/sequence.test.js"

await Science.run({
	parallel,
	sequence,
})


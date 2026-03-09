
import {State} from "./types.js"

export function setIndex({$index, views}: State, n: number) {
	n = Math.max(n, 0)
	n = Math.min(n, views.length - 1)
	$index(n)
}


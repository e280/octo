
import {State} from "./types.js"
import {wrap} from "../utils/wrapped.js"

export function addIndex({$index, views}: State, n: number) {
	const next = wrap($index() + n, views.length)
	$index(next)
}



import {State} from "./types.js"
import {wraplen} from "../../utils/wraplen.js"

export function addIndex({$index, views}: State, n: number) {
	const next = wraplen($index() + n, views.length)
	$index(next)
}


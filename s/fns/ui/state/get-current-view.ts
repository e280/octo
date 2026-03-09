
import {State} from "./types.js"

export function getCurrentView(state: State) {
	const index = state.$index()
	const view = state.views.at(index)
	if (!view) throw new Error(`invalid view index ${index}`)
	return view
}


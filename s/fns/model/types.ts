
import {Signal} from "@e280/strata"

export type State = {
	$index: Signal<number>
	views: (DashboardView | ProcessView)[]
}

export type Tab = {
	sigil: string
	$indicator: Signal<string>
	pid: number
	command: string
}

export type DashboardView = Tab & {
	kind: "dashboard"
}

export type ProcessView = Tab & {
	kind: "process"
	$lines: Signal<string[]>
}



import {Signal} from "@e280/strata"

export type State = {
	$rows: Signal<number>
	$columns: Signal<number>
	$index: Signal<number>
	views: (DashboardView | ProcessView)[]
}

export type Status = "happy" | "angry" | "done" | "failed"

export type Tab = {
	$status: Signal<Status>
	pid: number
	command: string
}

export type DashboardView = Tab & {
	kind: "dashboard"
}

export type ProcessView = Tab & {
	kind: "process"
	$data: Signal<Uint8Array[]>
}


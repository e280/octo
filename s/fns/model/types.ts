
export type State = {
	index: number
	views: (DashboardView | ProcessView)[]
}

export type Tab = {
	sigil: string
	indicator: string
	pid: number
	command: string
}

export type DashboardView = Tab & {
	kind: "dashboard"
}

export type ProcessView = Tab & {
	kind: "process"
	lines: string[]
}


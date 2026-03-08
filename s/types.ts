
import {Sub} from "@e280/stz"

export type Context = {
	proc: ProcInternal
	executeShell: ExecuteShellFn
}

export type ExitCode = number
export type KillSignal = "SIGINT" | "SIGTERM" | "SIGKILL"

export type ProcExternal = {
	pid: number
	command: string
	stdout: ReadableStream<Uint8Array>
	stderr: ReadableStream<Uint8Array>
	exitCode: Promise<ExitCode>
	kill: (signal: KillSignal) => void
}

export type ProcInternal = {
	pid: number
	command: string
	stdout: WritableStream<Uint8Array>
	stderr: WritableStream<Uint8Array>
	onKill: Sub<[KillSignal]>
	rows: number
	columns: number
	onResize: Sub
	onKey: Sub<[key: string]>
	exit: (exitCode: ExitCode) => void
}

export type ExecuteShellFn = (command: string) => ProcExternal


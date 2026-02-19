
import {Sub} from "@e280/stz"
import {Logger} from "@e280/sten"

export type Context = {
	logger: Logger
	proc: ProcInternal
	executeShell: ExecuteShellFn
}

export type ExitCode = number
export type KillSignal = "SIGINT" | "SIGTERM" | "SIGKILL"

export type ProcExternal = {
	stdin: WritableStream<Uint8Array>
	stdout: ReadableStream<Uint8Array>
	stderr: ReadableStream<Uint8Array>
	exitCode: Promise<ExitCode>
	kill: (signal: KillSignal) => void
}

export type ProcInternal = {
	stdin: ReadableStream<Uint8Array>
	stdout: WritableStream<Uint8Array>
	stderr: WritableStream<Uint8Array>
	onKill: Sub<[KillSignal]>
	exit: (exitCode: ExitCode) => void
}

export type ExecuteShellFn = (command: string) => ProcExternal



import {Logger} from "@e280/sten"
import {OnDeath} from "@benev/argv"

export type ExitCode = number // 0 | 1
export type ExecuteShellFn = (shelltext: string) => Promise<ExitCode>

export type Context = {
	logger: Logger
	onDeath: OnDeath
	pleaseExit: (exitCode: ExitCode) => Promise<void>
	executeShell: ExecuteShellFn
}


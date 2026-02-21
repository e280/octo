
import {ExitCode, ProcInternal} from "../../../types.js"

export type MockProcFn = (proc: ProcInternal) => Promise<ExitCode>


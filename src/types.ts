import type { ModuleOptions } from './module'
import type { LogObject } from 'consola'
import type { ParsedTrace } from 'errx'

export interface LogData {
  logObject: LogObject
  stack?: ParsedTrace
}

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    nuxtLogs: ModuleOptions
  }
}

declare module 'nitropack/types' {
  interface NitroRuntimeHooks {
    'dev:logs': (log: LogData) => void
  }
}

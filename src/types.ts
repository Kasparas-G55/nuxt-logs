import type { ModuleOptions } from './module'
import type { LogObject } from 'consola'
import type { NullableMappedPosition } from 'source-map'

export interface LogData {
  logObject: LogObject
  stack?: NullableMappedPosition
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

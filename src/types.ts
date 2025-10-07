import type { ConsolaInstance, LogObject } from 'consola'
import type { ModuleOptions } from './module'
import type { NullableMappedPosition } from 'source-map'

declare function useNuxtLogger(tag?: string): ConsolaInstance

interface LogData {
  logObject: LogObject
  trace?: NullableMappedPosition
}

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    nuxtLogs: ModuleOptions
  }
}

declare module 'nitropack/types' {
  interface NitroRuntimeConfig {
    nuxtLogs: ModuleOptions
  }

  interface NitroRuntimeHooks {
    'dev:logs': (log: LogData) => void
  }
}

export { useNuxtLogger }

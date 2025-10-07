import type { ModuleOptions } from './module'

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

export {}

import { defineNuxtModule, createResolver, addServerImports, addServerHandler } from '@nuxt/kit'
import { setupDevToolsUI } from './devtools'
import { LogLevels, type ConsolaOptions } from 'consola'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  devtools?: boolean
  loggerOptions: Partial<ConsolaOptions>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-logs',
    configKey: 'nuxtLogs',
  },
  defaults: {
    devtools: true,
    loggerOptions: {},
  },
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    _options.loggerOptions.level = _nuxt.options.dev ? LogLevels['debug'] : LogLevels['warn']

    _nuxt.options.runtimeConfig.nuxtLogs = defu(_nuxt.options.runtimeConfig.nuxtLogs, {
      loggerOptions: _options.loggerOptions,
    })

    // addImports({ name: 'useNuxtLogger', from: resolver.resolve('./loggers/app.ts') })
    addServerHandler({
      route: '/_sse-logs',
      handler: resolver.resolve('./runtime/server/sse.ts'),
    })

    addServerImports({ name: 'useNuxtLogger', from: resolver.resolve('./runtime/logger.ts') })

    if (_options.devtools)
      setupDevToolsUI(_nuxt, resolver)
  },
})

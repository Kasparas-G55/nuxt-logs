import { defineNuxtModule, createResolver, addImports, addServerImports, addServerHandler } from '@nuxt/kit'
import { setupDevToolsUI } from './devtools'

// Module options TypeScript interface definition
export interface ModuleOptions {
  devtools: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-logs',
    configKey: 'nuxtLogger',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    devtools: true,
  },
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Import logger for server and client.
    addImports({ name: 'useNuxtLogger', from: resolver.resolve('./loggers/app.ts') })
    addServerImports({ name: 'useNuxtLogger', from: resolver.resolve('./loggers/server.ts') })

    addServerHandler({
      route: '/_sse-logs',
      handler: resolver.resolve('./runtime/server/routes/sse.ts'),
    })

    if (_options.devtools)
      setupDevToolsUI(_nuxt, resolver)
  },
})

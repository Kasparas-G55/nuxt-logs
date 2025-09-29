import { useNuxtApp } from '#app'
import type { ConsolaOptions } from 'consola'
import { createConsola } from 'consola'

export const useNuxtLogger = (tag?: string, options: Partial<ConsolaOptions> = {}) => {
  const logger = createConsola(options)
    .withTag(tag ?? 'app')

  const nuxt = useNuxtApp()

  logger.addReporter({
    async log(logObj) {
      await nuxt.hooks.callHook('app:logs', logObj)
    },
  })

  return {
    logger,
  }
}

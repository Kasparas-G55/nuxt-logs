import { useNitroApp } from 'nitropack/runtime'
import type { ConsolaOptions } from 'consola'
import { createConsola } from 'consola'

export const useNuxtLogger = (tag?: string, options: Partial<ConsolaOptions> = {}) => {
  const logger = createConsola(options)
    .withTag(tag ?? 'server')

  const nitro = useNitroApp()

  logger.addReporter({
    async log(logObj) {
      logObj.date = new Date()
      await nitro.hooks.callHook('nitro:logs', logObj)
    },
  })

  return {
    logger,
  }
}

import { useNitroApp, useRuntimeConfig } from 'nitropack/runtime'
import { createConsola } from 'consola'
import { captureStackTrace } from 'errx'

export const useNuxtLogger = (tag?: string) => {
  const config = useRuntimeConfig()
  const logger = createConsola(config.nuxtLogs.loggerOptions)

  if (tag)
    logger.withTag(tag)

  const nitro = useNitroApp()

  logger.addReporter({
    async log(logObject, ctx) {
      if (logObject.level > ctx.options.level)
        return

      await nitro.hooks.callHook('dev:logs', { logObject, stack: captureStackTrace()[5] })
    },
  })

  return {
    logger,
  }
}

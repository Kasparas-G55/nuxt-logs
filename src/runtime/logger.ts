import { useNitroApp, useRuntimeConfig } from 'nitropack/runtime'
import { createConsola } from 'consola'
import { captureStackTrace } from 'errx'
import { SourceMapConsumer } from 'source-map'
import fs from 'node:fs'

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

      const mapFile = new URL(import.meta.url + '.map')
      const rawSourceMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'))
      const trace = captureStackTrace()[5]

      const absolutePath = await SourceMapConsumer.with(
        rawSourceMap,
        null,
        async function (consumer) {
          const originalPath = consumer.originalPositionFor({
            line: trace.line ?? 0,
            column: 0,
          })

          if (!originalPath.source)
            return

          originalPath.source = new URL(originalPath.source, import.meta.url).pathname

          return originalPath
        },
      )

      await nitro.hooks.callHook('dev:logs', { logObject, stack: absolutePath })
    },
  })

  return {
    logger,
  }
}

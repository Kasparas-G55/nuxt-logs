import { defineEventHandler, createEventStream } from 'h3'
import { stringify } from 'devalue'
import { useNitroApp } from 'nitropack/runtime'

export default defineEventHandler((event) => {
  if (!import.meta.dev)
    return

  const nitro = useNitroApp()
  const eventStream = createEventStream(event)

  const unregisterLogHook = nitro.hooks.hook('dev:logs', async (logs) => {
    await eventStream.push(stringify(logs))
  })

  eventStream.onClosed(async () => {
    console.log('[SSE] Closing stream...')
    unregisterLogHook()
    await eventStream.close()
  })

  return eventStream.send()
})

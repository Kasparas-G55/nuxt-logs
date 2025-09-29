import { defineEventHandler, createEventStream } from 'h3'
import { stringify } from 'devalue'
import { useNitroApp } from 'nitropack/runtime'

export default defineEventHandler((event) => {
  if (!import.meta.dev)
    return

  const eventStream = createEventStream(event)
  const nitroApp = useNitroApp()

  const unregisterLogHook = nitroApp.hooks.hook('nitro:logs', async (logs) => {
    await eventStream.push(stringify(logs))
  })

  eventStream.onClosed(async () => {
    console.log('[SSE] Closing stream...')
    unregisterLogHook()
    await eventStream.close()
  })

  return eventStream.send()
})

<script setup lang="ts">
import { ref } from 'vue'
import type { LogObject } from 'consola'
import { parse } from 'devalue'
import { useDevtoolsClient } from '@nuxt/devtools-kit/iframe-client'
import LogItem from '../components/LogItem.vue'
import { definePageMeta } from '#imports'

const client = useDevtoolsClient()

definePageMeta({
  title: 'Logs',
  category: 'analyze',
})

const logs = ref<Record<'server' | 'ssr', LogObject[]>>({
  server: [],
  ssr: [],
})

const eventSource = new EventSource('/_sse-logs')
eventSource.onmessage = (event: MessageEvent<string>) => {
  const log: LogObject = parse(event.data)
  logs.value.server.unshift(log)
}
</script>

<template>
  <NSectionBlock
    v-if="client"
    icon="carbon-bare-metal-server"
    :description="`Total logs: ${logs.server.length}`"
    padding="py0!"
    header-class="font-sans"
    container-class="font-sans m0!"
    text="Server"
  >
    <template v-if="logs.server.length">
      <LogItem
        v-for="(log, index) in logs.server"
        :key="index"
        :log-object="log"
      />
    </template>
    <div
      v-else
      text-center
      op-50
      py-2
    >
      Waiting for logs to be caught...
    </div>
  </NSectionBlock>

  <div v-else>
    <NTip n="yellow">
      Failed to connect to the client. Did you open this page inside Nuxt DevTools?
    </NTip>
  </div>
</template>

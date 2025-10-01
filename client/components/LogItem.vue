<script setup lang="ts">
import { useDevtoolsClient } from '@nuxt/devtools-kit/iframe-client'
import { formatDate } from '@vueuse/core'
import type { LogObject, LogType } from 'consola'
import type { NullableMappedPosition } from 'source-map'

const client = useDevtoolsClient()

const typeColors: Partial<Record<LogType, string>> = {
  error: 'text-red-400 bg-red/20',
  warn: 'text-amber-400 bg-amber/20',
  info: 'text-lightblue-400 bg-lightblue/20',
  debug: 'text-blue-400 bg-blue/20',
  start: 'text-purple-400 bg-purple/20',
  success: 'text-green-400 bg-green/20',
  ready: 'text-green-400 bg-green/20',
  fatal: 'text-red-600 bg-red-600/20',
  fail: 'text-red-400 bg-red-400/20',
  silent: 'text-dark bg-light-700',
}

const props = defineProps<{
  logObject: LogObject
  trace?: NullableMappedPosition
}>()

const filePath = computed(() => props.trace?.source + ':' + props.trace?.line)
const formatPath = computed(() => filePath.value.split('/').at(-1))

async function openFile() {
  if (!client.value)
    return

  await client.value.devtools.rpc.openInEditor(filePath.value)
}
</script>

<template>
  <div
    flex
    border-t
    border-base
  >
    <div
      flex
      justify-between
      p-2
      min-w-64
      min-h-16
      bg-active
      font-mono
    >
      <div>
        <NBadge v-if="logObject.tag">
          {{ logObject.tag }}
        </NBadge>
        <NBadge
          :class="typeColors[logObject.type]"
        >
          {{ logObject.type }}
        </NBadge>
      </div>
      <div>
        <NBadge>
          {{ formatDate(logObject.date, 'HH:mm:ss') }}
        </NBadge>
      </div>
    </div>
    <div
      w-full
      pt-1
      pl-4
    >
      <h2>
        {{ logObject.args[0] }}
      </h2>
      <NButton
        v-if="formatPath"
        class="mt-2 n-link hover-n-link-hover hover-n-green n-link-base"
        :border="false"
        @click="openFile"
      >
        {{ formatPath }}
      </NButton>
    </div>
  </div>
</template>

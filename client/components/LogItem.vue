<script setup lang="ts">
import { formatDate } from '@vueuse/core'
import type { LogObject, LogType } from 'consola'

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

defineProps<{
  logObject: LogObject
}>()
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
    </div>
  </div>
</template>

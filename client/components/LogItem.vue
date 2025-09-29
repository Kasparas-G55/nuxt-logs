<script setup lang="ts">
import { formatDate } from '@vueuse/core'
import type { LogObject, LogType } from 'consola'

const typeColors: Partial<Record<LogType, string>> = {
  error: 'text-red-400 bg-red/25',
  warn: 'text-amber-400 bg-amber/25',
  info: 'text-lightblue-400 bg-lightblue/25',
  debug: 'text-blue-400 bg-blue/25',
  start: 'text-purple-400 bg-purple/25',
  success: 'text-green-400 bg-green/25',
  ready: 'text-green-400 bg-green/25',
  fatal: 'text-red-600 bg-red-600/25',
  fail: 'text-red-400 bg-red-400/25',
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
        <NBadge>
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

<script setup lang="ts">
async function test() {
  await $fetch('/api/test')
}
</script>

<template>
  <div>
    <button @click="test">
      TEST
    </button>
  </div>
</template>

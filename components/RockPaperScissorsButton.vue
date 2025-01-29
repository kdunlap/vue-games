<template>
  <button
    class="border border-slate-600 rounded-md p-2"
    @click="onClick"
  >
    {{ name }}
  </button>
</template>

<script setup lang="ts">
export type Props = {
  name: string
}

const { name } = defineProps<Props>()
const emits = defineEmits(['click'])

function onClick(evt: MouseEvent) {
  emits('click', evt)
}
</script>

<style scoped>

</style>
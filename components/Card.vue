<template>
  <div 
    class="text-5xl font-bold w-32 h-32 cursor-pointer"
    :class="{ 
      'bg-contain bg-slate-900': !isFlipped,
      'bg-slate-400 flex justify-center items-center': isFlipped
    }"
    @click="onClick"
  >
    {{ isFlipped ? card.value : '' }}
  </div>
</template>

<script setup lang="ts">
export type Card = {
  value: String,
}

export type Props = {
  card: Card
}

const { card } = defineProps<Props>()

const isFlipped = ref(false)

function onClick() {
  isFlipped.value = !isFlipped.value
}
</script>

<style scoped>

</style>
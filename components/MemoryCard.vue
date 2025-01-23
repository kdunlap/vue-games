<template>
  <vue-flip 
    class="text-5xl font-bold cursor-pointer" 
    v-model="isFlipped"
    height="150px"
    width="150px"  
    @click="() => flipCard(card)"
  >
    <!-- front/back are swapped on purpose to better work with vue-flip -->
    <template v-slot:front>
      <div class="bg-slate-900 h-full w-full">&nbsp;</div>
    </template>
    <template v-slot:back>
      <MemoryCardImage 
        :card="card" 
        class="h-full w-full border" 
        :class="{ 
          'border-green-300': isMatched,
        }" 
      />
    </template>
  </vue-flip>
  
</template>

<script setup lang="ts">
// @ts-ignore
import { VueFlip } from 'vue-flip'

export type Props = {
  card: MemoryCard
}

const { card } = defineProps<Props>()
const { flipCard, cardIsFlipped, cardIsMatched } = useMemoryGameManager()

const isFlipped = computed(() => cardIsFlipped(card))
const isMatched = computed(() => cardIsMatched(card))

</script>

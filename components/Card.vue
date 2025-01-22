<template>
  <vue-flip 
    class="text-5xl font-bold cursor-pointer" 
    v-model="isFlipped"
    height="128px"
    width="128px"  
    @click="() => flipCard(card)"
  >
    <!-- front/back are swapped on purpose to better work with vue-flip -->
    <template v-slot:front>
      <div class="bg-slate-900 h-full w-full">&nbsp;</div>
    </template>
    <template v-slot:back>
      <div 
        class="flex justify-center items-center h-full w-full"
        :class="{ 
          'bg-slate-400': !isMatched,
          'bg-green-300': isMatched
        }"
      >
        {{ isFlipped ? card.value : '' }}
      </div>
    </template>
  </vue-flip>
  
</template>

<script setup lang="ts">
// @ts-ignore
import { VueFlip } from 'vue-flip'

export type Props = {
  card: Card
}

const { card } = defineProps<Props>()
const { flipCard, cardIsFlipped, cardIsMatched } = useGameManager()

const isFlipped = computed(() => cardIsFlipped(card))
const isMatched = computed(() => cardIsMatched(card))

</script>

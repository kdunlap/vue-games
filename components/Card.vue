<template>
  <div 
    class="text-5xl font-bold w-32 h-32 cursor-pointer"
    :class="{ 
      'bg-contain bg-slate-900': !isFlipped,
      'flex justify-center items-center': isFlipped,
      'bg-slate-400': !isMatched,
      'bg-green-300': isMatched
    }"
    @click="() => flipCard(card)"
  >
    {{ isFlipped ? card.value : '' }}
  </div>
</template>

<script setup lang="ts">

export type Props = {
  card: Card
}

const { card } = defineProps<Props>()
const { flipCard, cardIsFlipped, cardIsMatched } = useGameManager()

const isFlipped = computed(() => cardIsFlipped(card))
const isMatched = computed(() => cardIsMatched(card))

</script>

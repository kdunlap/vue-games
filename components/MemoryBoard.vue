<template>
  <div class="w-fit mx-auto">
    <ConfettiExplosion v-if="state === 'win'"/>

    <div class="flex justify-stretch items-center">
      <MemoryControls />
      <div v-if="state !== 'inactive'" class="ml-4">
        <p>Total Guesses: {{ guesses }}</p>
      </div>
      <MemoryStatus :state="state" class="flex-1 ml-8" />
    </div>

    <div class="grid grid-cols-4 grid-rows-4 grid-flow-dense gap-2 mt-4" data-testid="game-board">
      <MemoryCard 
        v-for="card in cards"
        :card="card"
      />
    </div>

    <div v-if="state !== 'inactive'" class="mt-8">
      <p class="text-xs underline"><a href="https://www.vecteezy.com/free-vector/memory-game" target="_blank">Memory Game Vectors by Vecteezy</a></p>
    </div>

  </div>
</template>

<script setup lang="ts">
const { cards, state, guesses } = useMemoryGame()
</script>

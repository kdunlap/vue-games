<template>
  <div class="w-fit">
    <div class="flex justify-stretch">
      <Controls />
      <Status class="flex-1" />
    </div>

    <div class="grid grid-cols-4 grid-rows-4 grid-flow-dense gap-4 mt-8">
      <Card 
        v-for="card in cards"
        :card="card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { cards } = useGameManager()
</script>

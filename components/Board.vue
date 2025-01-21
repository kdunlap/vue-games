<template>
  <div class="w-fit">
    <div class="grid grid-cols-4 grid-rows-4 grid-flow-dense gap-4">
      <Card 
        v-for="card in cards"
        :card="card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from './Card.vue'


const cards: Card[] = [
  { value: 'A' },
  { value: 'B' },
  { value: 'C' },
  { value: 'D' },
  { value: 'E' },
  { value: 'F' },
  { value: 'G' },
  { value: 'H' },
  { value: 'I' },
  { value: 'J' },
  { value: 'K' },
  { value: 'L' },
  { value: 'M' },
  { value: 'N' },
  { value: 'O' },
  { value: 'P' },
]

</script>

<style scoped>

</style>
<template>
  <div>
    <button v-if="state === 'inactive'" class="bg-slate-400 p-2" @click="startGame">Start Game</button>
    <button v-if="state !== 'inactive'" class="bg-slate-400 p-2" @click="resetGame">Reset Game</button>
  </div>
</template>

<script setup lang="ts">
const { startGame, resetGame, state } = useMemoryGame()
</script>

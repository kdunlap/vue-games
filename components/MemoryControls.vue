<template>
  <div>
    <ButtonBase v-if="state === 'inactive'" @click="startGame">Start Game</ButtonBase>
    <ButtonBase v-if="state !== 'inactive'" @click="resetGame">Reset Game</ButtonBase>
  </div>
</template>

<script setup lang="ts">
const { startGame, resetGame, state } = useMemoryGame()
</script>

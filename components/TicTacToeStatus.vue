<template>
  <div class="flex items-center gap-8">
    <ButtonBase @click="restartGame">Restart</ButtonBase>
    <p class="flex-1 text-2xl font-bold">
      <span v-if="state === 'win'">{{ turn }} Wins!</span>
      <span v-else-if="state === 'tie'">Tie!</span>
      <span v-else>{{ turn }}'s Turn</span>
    </p>
  </div>
</template>

<script setup lang="ts">
  const { state, turn, restartGame } = useTicTacToe()
</script>

<style scoped>

</style>
<template>
  <div class="flex items-center gap-8">
    <ButtonBase @click="$emit('restartGame')">Restart</ButtonBase>
    <p class="flex-1 text-2xl font-bold">
      <span v-if="state === 'win'">{{ turn }} Wins!</span>
      <span v-else-if="state === 'tie'">Tie!</span>
      <span v-else>{{ turn }}'s Turn</span>
    </p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  state: TicTacToeState
  turn: TicTacToeTurn
}

const { state, turn } = defineProps<Props>()

const emits = defineEmits(['restartGame'])

</script>

<style scoped>

</style>
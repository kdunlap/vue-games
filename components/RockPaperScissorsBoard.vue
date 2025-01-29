<template>
  <div class="w-fit mx-auto mt-8">
    
    <ConfettiExplosion v-if="state === 'win'"/>

    <div class="flex gap-16 justify-center">
      <div class="flex items-center">
        <div v-if="playerMove" class="capitalize">
          <p class="text-2xl">{{ playerMove }}</p>
        </div>
        <div v-else class="flex gap-4 items-center">
          <ButtonBase @click="selectPlayerMove('rock')">Rock</ButtonBase>
          <ButtonBase @click="selectPlayerMove('paper')">Paper</ButtonBase>
          <ButtonBase @click="selectPlayerMove('scissors')">Scissors</ButtonBase>
        </div>
      </div>

      <RockPaperScissorsStatus v-if="state !== 'select'"  />

      <div v-if="state !== 'select'" class="flex items-center capitalize">
        <p class="text-2xl">{{ computerMove }}</p>
      </div>
    </div>

    <RockPaperScissorsControls v-if="['win', 'lose', 'tie'].includes(state)" />
  </div>
</template>

<script setup lang="ts">
  const { playerMove, computerMove, state, selectPlayerMove } = useRockPaperScissors()
</script>

<style scoped>

</style>
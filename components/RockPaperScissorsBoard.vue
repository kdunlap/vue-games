<template>
  <div class="w-fit mx-auto mt-8">
    
    <ConfettiExplosion v-if="state === 'win' && readyToShow"/>

    <div v-if="!playerMove" >
      <p>Select your move:</p>
      <div class="flex gap-4 items-center mt-4">
        <ButtonBase @click="selectPlayerMove('rock')">Rock</ButtonBase>
        <ButtonBase @click="selectPlayerMove('paper')">Paper</ButtonBase>
        <ButtonBase @click="selectPlayerMove('scissors')">Scissors</ButtonBase>
      </div>
    </div>

    <RockPaperScissorsCountdown v-if="playerMove && !readyToShow" @done="() => readyToShow = true" />

    <div v-if="state !== 'select' && readyToShow" class="flex gap-16 justify-center">
      <div class="flex items-center">
        <div class="capitalize">
          <p>Player:</p>
          <p class="text-2xl">{{ playerMove }}</p>
        </div>
      </div>

      <RockPaperScissorsStatus />

      <div class="flex items-center">
        <div class="capitalize">
          <p>Computer:</p>
          <p class="text-2xl">{{ computerMove }}</p>
        </div>
      </div>
    </div>

    <RockPaperScissorsControls v-if="['win', 'lose', 'tie'].includes(state) && readyToShow" />
  </div>
</template>

<script setup lang="ts">
  import RockPaperScissorsCountdown from './RockPaperScissorsCountdown.vue';

  const { playerMove, computerMove, state, countdownState, selectPlayerMove } = useRockPaperScissors()

  const readyToShow = computed(() => countdownState.value === 'done')
</script>

<style scoped>

</style>
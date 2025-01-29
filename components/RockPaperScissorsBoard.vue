<template>
  <div class="w-fit mx-auto flex gap-16 justify-center mt-8">
    
    <div>
      <div class="flex items-center">
        <div v-if="playerMove" class="capitalize">
          <p class="text-2xl">{{ playerMove }}</p>
        </div>
        <div v-else class="flex gap-4 items-center">
          <RockPaperScissorsButton @click="selectPlayerMove('rock')" name="Rock" />
          <RockPaperScissorsButton @click="selectPlayerMove('paper')" name="Paper" />
          <RockPaperScissorsButton @click="selectPlayerMove('scissors')" name="Scissors" />
        </div>
      </div>
    </div>

    <RockPaperScissorsStatus v-if="state !== 'select'"  />

    <div v-if="state !== 'select'" class="flex items-center capitalize">
      <p class="text-2xl">{{ computerMove }}</p>
    </div>

  </div>
  <RockPaperScissorsControls v-if="['win', 'lose', 'tie'].includes(state)" />
</template>

<script setup lang="ts">

  const { playerMove, computerMove, state, selectPlayerMove } = useRockPaperScissors()

</script>

<style scoped>

</style>
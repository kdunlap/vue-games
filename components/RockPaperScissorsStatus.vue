<template>
  <div v-if="state !== 'select'" class="flex flex-col justify-center items-center">
    <p v-if="state === 'win'" class="text-2xl text-green-600">You Win!</p>
    <p v-if="state === 'lose'" class="text-2xl text-red-600">You Lose</p>
    <p v-if="state === 'tie'" class="text-2xl">Its a tie</p>
  </div>
</template>

<script setup lang="ts">
  const { state } = useRockPaperScissors()
</script>

<style scoped>

</style>
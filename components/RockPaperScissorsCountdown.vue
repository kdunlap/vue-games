<template>
  <p class="text-2xl text-center font-bold">
    {{ text }}
  </p>
</template>

<script setup lang="ts">
  const { countdownState } = useRockPaperScissors()
  const text = computed(() => {
    switch(countdownState.value) {
      case 'one':
        return 'Rock...'
      case 'two':
        return 'Rock...Paper...'
      case 'three':
        return 'Rock...Paper...Scissors...'
      case 'four':
        return 'Rock...Paper...Scissors...Shoot!'
      case 'done':
      default:
        return ''
    }
  })
</script>

<style scoped>

</style>
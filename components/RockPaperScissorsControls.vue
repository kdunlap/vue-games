<template>
  <div class="flex justify-center">
    <button  
      class="border border-slate-600 rounded-md mt-8 p-2"
      @click="restartGame"
    >
      Play Again
    </button>
  </div>
</template>

<script setup lang="ts">
const { restartGame } = useRockPaperScissors()
</script>

<style scoped>

</style>
<template>
  <div>
    <div class="flex justify-center items-center">
      <p class="flex-1 text-left"><nuxt-link to="/">&laquo; Back</nuxt-link></p>
      <h1 class="text-3xl font-bold text-center">Ultimate Tic, Tac, Toe</h1>
      <p class="flex-1">&nbsp;</p>
    </div>

    <div class="w-fit mx-auto my-8">
      <div 
        class="grid grid-cols-3 grid-rows-3 gap-3 p-3 bg-slate-700" 
        data-test="game-grid"
      >
        <TicTacToeBoard :show-controls="false" />
        <TicTacToeBoard :show-controls="false" />
        <TicTacToeBoard :show-controls="false" />
        <TicTacToeBoard :show-controls="false" />
        <TicTacToeBoard :show-controls="false" />
        <TicTacToeBoard :show-controls="false" />
        <TicTacToeBoard :show-controls="false" />
        <TicTacToeBoard :show-controls="false" />
        <TicTacToeBoard :show-controls="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
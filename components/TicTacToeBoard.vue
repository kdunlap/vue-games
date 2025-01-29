<template>
  <div class="w-fit mx-auto">
    <ConfettiExplosion v-if="state === 'win'"/>
    
    <div class="flex justify-center items-center gap-2 my-8">
      <p>Board Size: </p><TicTacToeBoardSizeStepper v-model="boardSize" />
    </div>

    <TicTacToeStatus class="my-8" />

    <div 
      class="grid gap-1 bg-slate-400" 
      :class="{
        'grid-cols-3 grid-rows-3': boardSize === 3,
        'grid-cols-4 grid-rows-4': boardSize === 4,
        'grid-cols-5 grid-rows-5': boardSize === 5,
        'grid-cols-6 grid-rows-6': boardSize === 6
      }"
      data-testid="game-board"
    >
      <template v-for="(row, rowIndex) in board">
        <p 
          v-for="(cell, colIndex) in row"
          class="flex items-center justify-center h-28 w-28 text-3xl cursor-pointer"
          :class="[
            isWinningCell(rowIndex, colIndex) ? 'bg-green-100' : 'bg-white'
          ]"
          @click="(evt) => selectCell(rowIndex, colIndex)"
        >
          {{ cell }}
        </p>
      </template>
    </div>

  </div>
</template>

<script setup lang="ts">
  import ConfettiExplosion from "vue-confetti-explosion"

  const { board, state, boardSize, isWinningCell, selectCell } = useTicTacToe()
</script>

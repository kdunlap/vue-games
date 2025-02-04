import { useIntervalFn } from '@vueuse/core';

export type Move = 'rock' | 'paper' | 'scissors'
export type RockPaperScissorsState = 'select' | 'win' | 'lose' | 'tie'
type CountdownState = 'one' | 'two' | 'three' | 'four' | 'done'

const countdownState = ref<CountdownState>('one')

const playerMove = ref<Move | undefined>()
const computerMove = ref<Move | undefined>()
const state = ref<RockPaperScissorsState>('select')

function useRockPaperScissorsCountdown() {
  const { pause, resume } = useIntervalFn(() => {
    if(countdownState.value === 'one') {
      countdownState.value = 'two'
    }
    else if(countdownState.value === 'two') {
      countdownState.value = 'three'
    }
    else if(countdownState.value === 'three') {
      countdownState.value = 'four'
    }
    else if(countdownState.value === 'four') {
      countdownState.value = 'done'
      pause()
    }
  }, 500, { immediate: false })

  return {
    pause,
    resume
  }
}

export function useRockPaperScissors() {

  const { pause, resume } = useRockPaperScissorsCountdown()

  function restartGame() {
    playerMove.value = undefined
    computerMove.value = undefined
    state.value = 'select'
    countdownState.value = 'one'
    pause()
  }

  function selectPlayerMove(move: Move) {
    playerMove.value = move
    selectComputerMove()
    resume()
  }

  function selectComputerMove() {
    const randNum = Math.floor(Math.random() * 3)
    switch(randNum) {
      case 0: 
        computerMove.value = 'rock'
        break
      case 1: 
        computerMove.value = 'paper'
        break
      case 2: 
        computerMove.value = 'scissors'
        break

      default:
        computerMove.value = undefined
    }

    determineWinner()
  }

  function determineWinner() {
    switch(playerMove.value) {
      case 'rock':
        if(computerMove.value === 'rock') {
          state.value = 'tie'
        }
        else if(computerMove.value === 'paper') {
          state.value = 'lose'
        }
        else {
          state.value = 'win'
        }
        return

      case 'paper':
        if(computerMove.value === 'rock') {
          state.value = 'win'
        }
        else if(computerMove.value === 'paper') {
          state.value = 'tie'
        }
        else {
          state.value = 'lose'
        }
        return

      case 'scissors':
        if(computerMove.value === 'rock') {
          state.value = 'lose'
        }
        else if(computerMove.value === 'paper') {
          state.value = 'win'
        }
        else {
          state.value = 'tie'
        }
    }
  }

  return {
    playerMove,
    computerMove,
    state,
    countdownState,
    selectPlayerMove,
    restartGame
  }
}
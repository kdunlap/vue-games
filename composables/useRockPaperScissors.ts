export type Move = 'rock' | 'paper' | 'scissors'
export type State = 'select' | 'win' | 'lose' | 'tie'

const playerMove = ref<Move | undefined>()
const computerMove = ref<Move | undefined>()
const state = ref<State>('select')

export function useRockPaperScissors() {
  function restartGame() {
    playerMove.value = undefined
    computerMove.value = undefined
    state.value = 'select'
  }

  function selectPlayerMove(move: Move) {
    playerMove.value = move
    selectComputerMove()
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
    selectPlayerMove,
    restartGame
  }
}
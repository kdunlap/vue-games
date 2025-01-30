export type TicTacToeTurn = 'X' | 'O'
export type TicTacToeCellValue = '' | TicTacToeTurn
export type TicTacToeState = 'active' | 'win' | 'tie'

// [0,0] => true
type WinningCell = {
  [key: string]: boolean
}

export function useTicTacToe() {

  const boardSize = ref(3)

  const totalMoves = ref(0)
  const board = ref<TicTacToeCellValue[][]>(getDefaultBoard())
  const turn = ref<TicTacToeTurn>('X')
  const state = ref<TicTacToeState>('active')
  const winningCells = ref<WinningCell>({})

  function getDefaultBoard(): TicTacToeCellValue[][] {
    return Array.from({ length: boardSize.value }, () => Array(boardSize.value).fill(''))
  }

  function isWinningCell(x: number, y: number): boolean {
    return state.value === 'win' && winningCells.value[`${x},${y}`] === true
  }

  function restartGame() {
    board.value = getDefaultBoard()
    turn.value = 'X'
    totalMoves.value = 0
    state.value = 'active'
    winningCells.value = {}
  }

  watch(boardSize, () => {
    restartGame()
  })

  function selectCell(x: number, y: number) {
    if(state.value !== 'active') return

    if(x < 0 || x > boardSize.value - 1) {
      throw new Error('Cell index X is out of bounds')
    }
    if(y < 0 || y > boardSize.value - 1) {
      throw new Error('Cell index Y is out of bounds')
    }

    if(board.value[x][y] !== '') return

    board.value[x][y] = turn.value
    totalMoves.value += 1

    checkWinner(x, y)

    // swap turn if game still active
    if(state.value === 'active') {
      turn.value = turn.value === 'X' ? 'O' : 'X'
    }
  }

  function checkWinner(x: number, y: number) {

    // check current row for winner
    winningCells.value = {}
    for(let col = 0; col < boardSize.value; col++) {
      if(board.value[x][col] !== turn.value) {
        break
      }
      winningCells.value[`${x},${col}`] = true
      if(col === boardSize.value - 1) {
        state.value = 'win'
        return
      }
    }

    // check columns
    winningCells.value = {}
    for(let row = 0; row < boardSize.value; row++) {
      if(board.value[row][y] !== turn.value) {
        break
      }
      winningCells.value[`${row},${y}`] = true
      if(row === boardSize.value - 1) {
        state.value = 'win'
        return
      }
    }

    // check diagonals
    winningCells.value = {}
    if(x == y){
      for(let i = 0; i < boardSize.value; i++){
          if(board.value[i][i] != turn.value) {
              break;
          }
          winningCells.value[`${i},${i}`] = true
          if(i === boardSize.value - 1) {
            state.value = 'win'
            return
          }
      }
    }

    winningCells.value = {}
    if(x + y == boardSize.value - 1){
      for(let i = 0; i < boardSize.value; i++){
          if(board.value[i][(boardSize.value-1)-i] != turn.value) {
              break;
          }
          winningCells.value[`${i},${(boardSize.value-1)-i}`] = true
          if(i === boardSize.value - 1) {
            state.value = 'win'
            return
          }
      }
    }

    winningCells.value = {}
    if(totalMoves.value === Math.pow(boardSize.value, 2)) {
      state.value = 'tie'
    }
  }

  return {
    boardSize,
    board,
    turn,
    state,
    totalMoves,
    isWinningCell,
    restartGame,
    selectCell
  }
}
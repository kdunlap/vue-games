import { describe, it, expect, vi, afterEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { useTicTacToe } from '~/composables/useTicTacToe'

describe('useTicTacToe', () => {
  afterEach(() => {
    const { restartGame } = useTicTacToe()
    restartGame()
    
    vi.resetAllMocks()
  })
  it('should initialize to `active` state', () => {
    const { state } = useTicTacToe()
    expect(state.value).toBe('active')
  })
  it('should select a cell and then alternate the turn', () => {
    const { board, turn, selectCell } = useTicTacToe()

    expect(turn.value).toBe('X')

    selectCell(0, 0)

    expect(board.value[0][0]).toBe('X')
    expect(turn.value).toBe('O')
  })
  it('should not select out of bounds cells', () => {
    const { boardSize, selectCell } = useTicTacToe()

    expect(() => selectCell(-1, -1)).toThrowError()
    expect(() => selectCell(boardSize.value + 1, 0)).toThrowError()
    expect(() => selectCell(0, boardSize.value + 1)).toThrowError()
  })
  it('should not select already selected cells', () => {
    const { board, turn, selectCell } = useTicTacToe()

    selectCell(0, 0)
    selectCell(0, 0)

    expect(board.value[0][0]).toBe('X')
    expect(turn.value).toBe('O')
  })
  it('should determine a row match winner', () => {
    const { selectCell, isWinningCell, state, turn } = useTicTacToe()

    selectCell(0, 0) // x
    selectCell(1, 2) // o
    selectCell(0, 1) // x
    selectCell(2, 0) // o
    selectCell(0, 2) // x

    expect(state.value).toBe('win')
    expect(turn.value).toBe('X')

    expect(isWinningCell(0, 0)).toBe(true)
    expect(isWinningCell(0, 1)).toBe(true)
    expect(isWinningCell(0, 2)).toBe(true)
    expect(isWinningCell(1, 2)).toBe(false)
  })
  it('should determine a column match winner', () => {
    const { selectCell, isWinningCell, state, turn } = useTicTacToe()

    selectCell(0, 0) // x
    selectCell(1, 2) // o
    selectCell(1, 0) // x
    selectCell(2, 2) // o
    selectCell(2, 0) // x

    expect(state.value).toBe('win')
    expect(turn.value).toBe('X')
    expect(isWinningCell(0, 0)).toBe(true)
    expect(isWinningCell(1, 0)).toBe(true)
    expect(isWinningCell(2, 0)).toBe(true)
    expect(isWinningCell(1, 2)).toBe(false)
  })
  it('should determine a diagnoal match winner', () => {
    const { selectCell, isWinningCell, state, turn } = useTicTacToe()

    selectCell(0, 0) // x
    selectCell(1, 2) // o
    selectCell(1, 1) // x
    selectCell(2, 0) // o
    selectCell(2, 2) // x

    expect(state.value).toBe('win')
    expect(turn.value).toBe('X')
    expect(isWinningCell(0, 0)).toBe(true)
    expect(isWinningCell(1, 1)).toBe(true)
    expect(isWinningCell(2, 2)).toBe(true)
    expect(isWinningCell(1, 2)).toBe(false)
  })
  it('should determine a anti-diagnoal match winner', () => {
    const { selectCell, isWinningCell, state, turn } = useTicTacToe()

    selectCell(2, 0) // x
    selectCell(1, 2) // o
    selectCell(1, 1) // x
    selectCell(2, 2) // o
    selectCell(0, 2) // x

    expect(state.value).toBe('win')
    expect(turn.value).toBe('X')
    expect(isWinningCell(2, 0)).toBe(true)
    expect(isWinningCell(1, 1)).toBe(true)
    expect(isWinningCell(0, 2)).toBe(true)
    expect(isWinningCell(1, 2)).toBe(false)
  })
  it('should determine a tie', () => {
    const { selectCell, state, turn } = useTicTacToe()

    selectCell(0, 0) // x
    selectCell(1, 0) // o
    selectCell(2, 0) // x
    selectCell(1, 1) // o
    selectCell(1, 2) // x
    selectCell(0, 2) // o
    selectCell(0, 1) // x
    selectCell(2, 2) // o
    selectCell(2, 1) // x

    expect(state.value).toBe('tie')
  })
  it('should increase the boardSize and reset the game', async () => {
    const { selectCell, boardSize, board, turn } = useTicTacToe()

    selectCell(0, 0)
    selectCell(1, 0)
    selectCell(2, 0)
    selectCell(1, 1)

    expect(board.value[0][0]).toBe('X')
    expect(board.value[1][0]).toBe('O')
    expect(board.value[2][0]).toBe('X')
    expect(board.value[1][1]).toBe('O')

    boardSize.value = 4

    await flushPromises()

    expect(board.value.length).toBe(4)
    expect(board.value[0].length).toBe(4)
    expect(turn.value).toBe('X')
    expect(board.value[0].every(val => val === ''))
    expect(board.value[1].every(val => val === ''))
    expect(board.value[2].every(val => val === ''))
  })
  it('should determine a row match winner with a larger board', async () => {
    const { selectCell, isWinningCell, state, turn, boardSize } = useTicTacToe()

    boardSize.value = 4
    await flushPromises()

    selectCell(0, 0) // x
    selectCell(1, 2) // o
    selectCell(0, 1) // x
    selectCell(2, 0) // o
    selectCell(0, 2) // x
    selectCell(2, 2) // o
    selectCell(0, 3) // x

    expect(state.value).toBe('win')
    expect(turn.value).toBe('X')

    expect(isWinningCell(0, 0)).toBe(true)
    expect(isWinningCell(0, 1)).toBe(true)
    expect(isWinningCell(0, 2)).toBe(true)
    expect(isWinningCell(0, 3)).toBe(true)
    expect(isWinningCell(1, 2)).toBe(false)
  })
})

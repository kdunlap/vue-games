import { describe, it, expect, vi, afterEach } from 'vitest'

describe('useMemoryGame', () => {
  afterEach(() => {
    const { restartGame } = useRockPaperScissors()
    restartGame()
  })
  it('should initialize in `select` state', () => {
    const { state } = useRockPaperScissors()
    expect(state.value).toBe('select')
  })

  it('should determine the game result after the player selects their move', () => {
    const { state, selectPlayerMove } = useRockPaperScissors()
    selectPlayerMove('rock')
    expect(['win', 'lose', 'tie']).toContain(state.value)
  })
})
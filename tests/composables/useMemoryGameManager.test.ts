import { describe, it, expect, vi, afterEach } from 'vitest'
import { useMemoryGameManager, FLIPPED_CARD_TIMEOUT, type MemoryCard } from '~/composables/useMemoryGameManager'

const { confirmMock } = vi.hoisted(() => ({
  confirmMock: vi.fn()
}))
vi.stubGlobal('confirm', confirmMock)

describe('useMemoryGameManager', () => {
  afterEach(() => {
    const { resetGame } = useMemoryGameManager()
    resetGame()
    
    vi.resetAllMocks()
  })
  it('should initialize to `inactive` state', () => {
    const { state } = useMemoryGameManager()
    expect(state.value).toBe('inactive')
  })
  it('should initialize a deck of pairs', () => {
    const { startGame, cards } = useMemoryGameManager()

    startGame()

    const found: {[key:string]: number} = {}
    cards.value.forEach((c: MemoryCard) => {
      if(found[c.value]) {
        found[c.value] += 1
      }
      else {
        found[c.value] = 1
      }
    })

    expect(Object.keys(found).length).toBe(cards.value.length / 2)
    expect(Object.values(found).every(total => total === 2)).toBe(true)
  })
  it('should have `active` state after starting the game', () => {
    const { startGame, state } = useMemoryGameManager()

    startGame()

    expect(state.value).toBe('active')
  })
  it('should flip a single card and be in the `selecting` state', () => {
    const { startGame, flipCard, cardIsFlipped, cards, state } = useMemoryGameManager()

    startGame()
    
    const card = cards.value[0]
    flipCard(card)

    expect(state.value).toBe('selecting')
    expect(cardIsFlipped(card)).toBe(true)
  })
  it('should flip two matching cards and be in the `match-found` state', () => {
    const { startGame, flipCard, cardIsFlipped, cardIsMatched, cards, state } = useMemoryGameManager()

    startGame()
    
    const card = cards.value[0]
    const match = cards.value.find(c => c.value === card.value && c.id !== card.id) as MemoryCard
    
    flipCard(card)
    flipCard(match)

    expect(match).toBeDefined()
    expect(state.value).toBe('match-found')
    expect(cardIsFlipped(card)).toBe(true)
    expect(cardIsFlipped(match)).toBe(true)
    expect(cardIsMatched(card)).toBe(true)
    expect(cardIsMatched(match)).toBe(true)
  })
  it('should flip two non-matching cards and be in the `match-found` state', () => {
    const { startGame, flipCard, cardIsFlipped, cardIsMatched, cards, state } = useMemoryGameManager()

    startGame()
    
    const card = cards.value[0]
    const nonMatch = cards.value.find(c => c.value !== card.value && c.id !== card.id) as MemoryCard
    
    flipCard(card)
    flipCard(nonMatch)

    expect(nonMatch).toBeDefined()
    expect(state.value).toBe('no-match')
    expect(cardIsFlipped(card)).toBe(true)
    expect(cardIsFlipped(nonMatch)).toBe(true)
    expect(cardIsMatched(card)).toBe(false)
    expect(cardIsMatched(nonMatch)).toBe(false)
  })
  it('should automatically change from `no-match` state to `active` after some time', async () => {    
    vi.useFakeTimers()

    const { startGame, flipCard, cards, state } = useMemoryGameManager()

    startGame()
    
    const card = cards.value[0]
    const nonMatch = cards.value.find(c => c.value !== card.value && c.id !== card.id) as MemoryCard
    
    flipCard(card)
    flipCard(nonMatch)

    expect(state.value).toBe('no-match')

    vi.advanceTimersByTime(FLIPPED_CARD_TIMEOUT)

    expect(state.value).toBe('active')
  })
  it('should not flip more than 2 cards at once', () => {
    const { startGame, flipCard, cardIsFlipped, cards } = useMemoryGameManager()

    startGame()
    
    const card = cards.value[0]
    const match = cards.value.find(c => c.value === card.value && c.id !== card.id) as MemoryCard
    const nonMatch = cards.value.find(c => c.value !== card.value && c.id !== card.id) as MemoryCard
    
    flipCard(card)
    flipCard(nonMatch)
    flipCard(match)

    expect(cardIsFlipped(card)).toBe(false)
    expect(cardIsFlipped(nonMatch)).toBe(false)
    expect(cardIsFlipped(match)).toBe(true)
  })
  it('should confirm before resetGame is called if we are not in a `win` state', () => {
    const { startGame, flipCard, resetGame, cards, cardIsFlipped } = useMemoryGameManager()

    startGame()
    
    const card = cards.value[0]
    flipCard(card)
    expect(cardIsFlipped(card)).toBe(true)

    resetGame()
    expect(confirmMock).toHaveBeenCalledOnce()
  })
  it('should start a timer after two cards are flipped', () => {
    vi.useFakeTimers()
    const { startGame, flipCard, cards } = useMemoryGameManager()

    startGame()
    
    const card = cards.value[0]
    const nonMatch = cards.value.find(c => c.value !== card.value && c.id !== card.id) as MemoryCard
    
    flipCard(card)
    flipCard(nonMatch)

    expect(vi.getTimerCount()).toBe(1)

    vi.advanceTimersByTime(FLIPPED_CARD_TIMEOUT)

    expect(vi.getTimerCount()).toBe(0)
  })
})

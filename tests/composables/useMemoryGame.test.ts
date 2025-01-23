import { describe, it, expect, vi, afterEach } from 'vitest'
import { useMemoryGame, FLIPPED_CARD_TIMEOUT, type MemoryCard } from '~/composables/useMemoryGame'

const { confirmMock } = vi.hoisted(() => ({
  confirmMock: vi.fn()
}))
vi.stubGlobal('confirm', confirmMock)

describe('useMemoryGame', () => {
  afterEach(() => {
    const { resetGame } = useMemoryGame()
    resetGame()
    
    vi.resetAllMocks()
  })
  it('should initialize to `inactive` state', () => {
    const { state } = useMemoryGame()
    expect(state.value).toBe('inactive')
  })
  it('should initialize a deck of pairs', () => {
    const { startGame, cards } = useMemoryGame()

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
    const { startGame, state } = useMemoryGame()

    startGame()

    expect(state.value).toBe('active')
  })
  it('should flip a single card and be in the `selecting` state', () => {
    const { startGame, flipCard, cardIsFlipped, cards, state } = useMemoryGame()

    startGame()
    
    const card = cards.value[0]
    flipCard(card)

    expect(state.value).toBe('selecting')
    expect(cardIsFlipped(card)).toBe(true)
  })
  it('should flip two matching cards and be in the `match-found` state', () => {
    const { startGame, flipCard, cardIsFlipped, cardIsMatched, cards, state } = useMemoryGame()

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
    const { startGame, flipCard, cardIsFlipped, cardIsMatched, cards, state } = useMemoryGame()

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

    const { startGame, flipCard, cards, state } = useMemoryGame()

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
    const { startGame, flipCard, cardIsFlipped, cards } = useMemoryGame()

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
    const { startGame, flipCard, resetGame, cards, cardIsFlipped } = useMemoryGame()

    startGame()
    
    const card = cards.value[0]
    flipCard(card)
    expect(cardIsFlipped(card)).toBe(true)

    resetGame()
    expect(confirmMock).toHaveBeenCalledOnce()
  })
  it('should start a timer after two cards are flipped', () => {
    vi.useFakeTimers()
    const { startGame, flipCard, cards } = useMemoryGame()

    startGame()
    
    const card = cards.value[0]
    const nonMatch = cards.value.find(c => c.value !== card.value && c.id !== card.id) as MemoryCard
    
    flipCard(card)
    flipCard(nonMatch)

    expect(vi.getTimerCount()).toBe(1)

    vi.advanceTimersByTime(FLIPPED_CARD_TIMEOUT)

    expect(vi.getTimerCount()).toBe(0)
  })
  it('should increase total moves when a pair of cards are fliped', () => {
    const { startGame, flipCard, cards, guesses } = useMemoryGame()

    startGame()
    
    const card1 = cards.value[0]
    const card2 = cards.value[1]
    const card3 = cards.value[2]
    const card4 = cards.value[3]

    flipCard(card1)
    expect(guesses.value).toBe(0)

    flipCard(card2)
    expect(guesses.value).toBe(1)

    flipCard(card3)
    expect(guesses.value).toBe(1)

    flipCard(card4)
    expect(guesses.value).toBe(2)
  })
})

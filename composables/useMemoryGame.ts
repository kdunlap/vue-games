import { ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

export type MemoryCard = {
  id: Number
  value: string
  coords: {
    x: number
    y: number
  }
}

export type MemoryGameState = 'inactive' | 'active' | 'selecting' | 'match-found' | 'no-match' | 'win'

export const BOARD_SIZE = 8
export const FLIPPED_CARD_TIMEOUT = 3000

const availableCards: MemoryCard[] = [
  { id: 0, value: 'A', coords: { x: 49, y: 223 } },
  { id: 0, value: 'B', coords: { x: 227, y: 223 } },
  { id: 0, value: 'C', coords: { x: 405, y: 223 } },
  { id: 0, value: 'D', coords: { x: 583, y: 223 } },
  { id: 0, value: 'E', coords: { x: 761, y: 223 } },
  { id: 0, value: 'F', coords: { x: 49, y: 403 } },
  { id: 0, value: 'G', coords: { x: 405, y: 403 } },
  { id: 0, value: 'H', coords: { x: 583, y: 403 } },
  { id: 0, value: 'I', coords: { x: 761, y: 403 } },
  { id: 0, value: 'J', coords: { x: 49, y: 583 } },
]

const state = ref<MemoryGameState>('inactive')
const gameDeck = ref<MemoryCard[]>([])
const flippedCards = ref<MemoryCard[]>([])
const matchedCards = ref<String[]>([])
const guesses = ref<number>(0)

const { start: startTimer } = useTimeoutFn(() => {
  if(state.value === 'win' || state.value === 'inactive') return

  if(state.value === 'no-match') {
    flippedCards.value = []
  }
  state.value = 'active' 
}, FLIPPED_CARD_TIMEOUT, { immediate: false })

export function useMemoryGame() {
  const { shuffle } = useDeckUtils()

  function startGame() {
    // duplicate available cards and set unique ids
    const gameCards = availableCards.slice(0, BOARD_SIZE)
    gameDeck.value = shuffle(gameCards.concat(gameCards).map((card, index) => ({ ...card, id: index })))

    // set initial state
    matchedCards.value = []
    flippedCards.value = []
    state.value = 'active'
    guesses.value = 0
  }

  function flipCard(card: MemoryCard) {
    // don't flip card if it is already flipped over
    if(cardIsFlipped(card) || cardIsMatched(card)) return

    // reset flipped cards if timer hasn't fired yet
    if(flippedCards.value.length >= 2 || ['no-match', 'match-found'].includes(state.value)) {
      flippedCards.value = []
      state.value = 'active'
    }

    flippedCards.value.push(card)

    // if we only have one card flipped, set state and bail
    if(flippedCards.value.length === 1) {
      state.value = 'selecting'
      return
    }

    // There should always be 2 flipped cards after this point
    guesses.value += 1

    // match found
    if(flippedCards.value[0].value === flippedCards.value[1].value) {
      matchedCards.value.push(flippedCards.value[0].value)
      flippedCards.value = []

      state.value = matchedCards.value.length === BOARD_SIZE ? 'win' : 'match-found'
    }

    // no match
    else {
      state.value = 'no-match'
    }

    if(state.value !== 'win') {
      startTimer()
    }
  }

  async function resetGame() {
    if(state.value === 'win' || confirm("Are you sure you want to reset the game?")) {
      state.value = 'inactive'
      flippedCards.value = []
      gameDeck.value = []
      guesses.value = 0
    }
  }

  function cardIsFlipped(card: MemoryCard) {
    return flippedCards.value.find(c => c.id === card.id) !== undefined || cardIsMatched(card)
  }

  function cardIsMatched(card: MemoryCard) {
    return matchedCards.value.find(val => val === card.value) !== undefined
  }

  return {
    cards: gameDeck,
    state,
    guesses,
    startGame,
    resetGame,
    flipCard,
    cardIsFlipped,
    cardIsMatched
  }
}
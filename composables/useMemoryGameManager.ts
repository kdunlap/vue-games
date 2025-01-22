import { ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

export type MemoryCard = {
  id: Number
  value: string
}

export type MemoryGameState = 'inactive' | 'active' | 'selecting' | 'match-found' | 'no-match' | 'win'

export const BOARD_SIZE = 8
export const FLIPPED_CARD_TIMEOUT = 3000

const availableCards: MemoryCard[] = [
  { id: 0, value: 'A' },
  { id: 0, value: 'B' },
  { id: 0, value: 'C' },
  { id: 0, value: 'D' },
  { id: 0, value: 'E' },
  { id: 0, value: 'F' },
  { id: 0, value: 'G' },
  { id: 0, value: 'H' },
  { id: 0, value: 'I' },
  { id: 0, value: 'J' },
  { id: 0, value: 'K' },
  { id: 0, value: 'L' },
  { id: 0, value: 'M' },
  { id: 0, value: 'N' },
  { id: 0, value: 'O' },
  { id: 0, value: 'P' },
]

const state = ref<MemoryGameState>('inactive')
const gameDeck = ref<MemoryCard[]>([])
const flippedCards = ref<MemoryCard[]>([])
const matchedCards = ref<String[]>([])

const { start: startTimer } = useTimeoutFn(() => {
  if(state.value === 'win') return

  if(state.value === 'no-match') {
    flippedCards.value = []
  }
  state.value = 'active' 
}, FLIPPED_CARD_TIMEOUT, { immediate: false })

export function useMemoryGameManager() {
  const { shuffle } = useDeckUtils()

  function startGame() {
    // duplicate available cards and set unique ids
    const gameCards = availableCards.slice(0, BOARD_SIZE)
    gameDeck.value = shuffle(gameCards.concat(gameCards).map((card, index) => ({ ...card, id: index })))

    // set initial state
    matchedCards.value = []
    flippedCards.value = []
    state.value = 'active'
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
      console.log("start timer")
      startTimer()
    }
  }

  async function resetGame() {
    if(state.value === 'win' || confirm("Are you sure you want to reset the game?")) {
      state.value = 'inactive'
      flippedCards.value = []
      gameDeck.value = []
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
    startGame,
    resetGame,
    flipCard,
    cardIsFlipped,
    cardIsMatched
  }
}
import { ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

export type Card = {
  id: Number
  value: String
}

export type GameState = 'inactive' | 'active' | 'selecting' | 'match-found' | 'no-match' | 'win'
const BOARD_SIZE = 8
const availableCards: Card[] = [
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

function shuffle(array: Card[]) { 
  return array.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); 
}; 

const state = ref<GameState>('inactive')

const gameDeck = ref<Card[]>([])
const flippedCards = ref<Card[]>([])
const matchedCards = ref<String[]>([])

const { 
  start: startTimer, 
  stop: stopTimer
} = useTimeoutFn(() => { 
  if(state.value === 'win') return

  if(state.value === 'no-match') {
    flippedCards.value = []
  }
  state.value = 'active' 
}, 3000, { immediate: false })

export function useGameManager() {
  function startGame() {
    if(state.value !== 'inactive') return

    const gameCards = availableCards.slice(0, BOARD_SIZE)
    gameDeck.value = shuffle(gameCards.concat(gameCards).map((card, index) => ({ ...card, id: index })))
    matchedCards.value = []
    flippedCards.value = []
    state.value = 'active'
  }

  function flipCard(card: Card) {
    if(state.value === 'win') return

    if(flippedCards.value.length >= 2) {
      flippedCards.value = []
    }

    stopTimer()
    state.value = 'active'
    flippedCards.value.push(card)

    if(flippedCards.value.length === 2) {
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

      startTimer()
    }
    else{
      state.value = 'selecting'
    }
  }

  function resetGame() {
    state.value = 'inactive'
    flippedCards.value = []
    gameDeck.value = []
  }

  function cardIsFlipped(card: Card) {
    return flippedCards.value.find(c => c.id === card.id) !== undefined || cardIsMatched(card)
  }

  function cardIsMatched(card: Card) {
    return matchedCards.value.find(val => val === card.value) !== undefined
  }

  return {
    cards: gameDeck,
    flippedCards,
    state,
    startGame,
    resetGame,
    flipCard,
    cardIsFlipped,
    cardIsMatched
  }
}
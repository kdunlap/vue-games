
function shuffle(array: any[]){
  return array.map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value); 
}

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

export function useDeckUtils() {
  return {
    availableCards,
    shuffle
  }
}
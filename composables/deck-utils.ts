

function shuffle(array: Card[]){
  return array.map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value); 
}

export function useDeckUtils() {
  return {
    shuffle
  }
}
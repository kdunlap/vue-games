import { describe, it, expect } from 'vitest'
import { useDeckUtils } from '~/composables/deck-utils'

describe('useDeckUtils: shuffle()', () => {
  it('should change the order of the resulting array', () => {
    const { shuffle } = useDeckUtils()

    const original = [0, 1, 2, 3, 4]
    const shuffled = shuffle(original)

    expect(original).not.toEqual(shuffled)
  })
  it('should not alter the original array', () => {
    const { shuffle } = useDeckUtils()

    const original = [0, 1, 2, 3, 4]
    const copy = original.concat()
    shuffle(original)

    expect(original).toEqual(copy)
  })
  it('should not lose any values from the original array', () => {
    const { shuffle } = useDeckUtils()

    const original = ['a', 'b', 'c', 'd', 'e']
    const shuffled = shuffle(original)

    const intersection = [
      ...new Set(original.filter(e => shuffled.includes(e)))
    ]

    expect(intersection.length).toBe(original.length)
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MemoryCard from '~/components/MemoryCard.vue'

describe('MemoryCard.vue', () => {
  it('should render', () => {
    const wrapper = mount(MemoryCard, {
      props: {
        card: { id: 0, value: 'A' }
      }
    })
    expect(wrapper).toBeTruthy()
  })

  it('should flip card when clicked', async () => {
    const { startGame, cards } = useMemoryGameManager()
    startGame()

    const card = cards.value[0]
    const wrapper = mount(MemoryCard, {
      props: {
        card
      }
    })

    expect(wrapper.find('.flipper').attributes('style')).not.toContain('transform: rotateY(180deg)')

    await wrapper.trigger('click')
    
    expect(wrapper.find('.flipper').attributes('style')).toContain('transform: rotateY(180deg)')
  })
})

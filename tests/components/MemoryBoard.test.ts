import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import MemoryBoard from '~/components/MemoryBoard.vue'
import MemoryCard from '~/components/MemoryCard.vue'
import MemoryControls from '~/components/MemoryControls.vue'
import MemoryStatus from '~/components/MemoryStatus.vue'
import { BOARD_SIZE } from '~/composables/useMemoryGame'

describe('MemoryBoard.vue', () => {
  it('should render with no board', () => {
    const wrapper = mount(MemoryBoard)
    expect(wrapper).toBeTruthy()
    const cards = wrapper.findAllComponents(MemoryCard)
    expect(cards.length).toBe(0)
  })
  it('should render a board when `Start Game` is clicked', async () => {
    const wrapper = mount(MemoryBoard)
    const button = wrapper.find('button')

    await button.trigger('click')

    const cards = wrapper.findAllComponents(MemoryCard)
    expect(cards.length).toBe(BOARD_SIZE * 2)
  })
  it('should include MemoryControls', async () => {
    const wrapper = shallowMount(MemoryBoard)

    const cards = wrapper.findAllComponents(MemoryControls)
    expect(cards.length).toBe(1)
  })
  it('should include MemoryStatus', async () => {
    const wrapper = shallowMount(MemoryBoard)

    const cards = wrapper.findAllComponents(MemoryStatus)
    expect(cards.length).toBe(1)
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MemoryControls from '~/components/MemoryControls.vue'

describe('MemoryControls.vue', () => {
  it('should render `Start Game` button initially', () => {
    const wrapper = mount(MemoryControls)
    const button = wrapper.find('button')
    expect(button.text()).toBe('Start Game')
  })
  it('should render `Reset Game` after game has been started', async () => {
    const { startGame } = useMemoryGame()
    startGame()

    const wrapper = mount(MemoryControls)
    const button = wrapper.find('button')

    expect(button.text()).toBe('Reset Game')
  })
})

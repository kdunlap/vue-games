import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TicTacToeStatus from '~/components/TicTacToeStatus.vue'

describe('TicTacToeStatus.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should render', () => {
    const wrapper = mount(TicTacToeStatus)
    expect(wrapper).toBeTruthy()
  })
  it('should call restartGame when button pressed', async () => {
    const wrapper = mount(TicTacToeStatus)
    
    const button = wrapper.get('button')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('restartGame')
  })
  it('should show the current turn', () => {
    const wrapper = mount(TicTacToeStatus, {
      props: {
        turn: 'X',
        state: 'active'
      }
    })

    const span = wrapper.get('span')
    expect(span.text()).toBe('X\'s Turn')
  })
  it('should show a win state', () => {
    const wrapper = mount(TicTacToeStatus, {
      props: {
        turn: 'X',
        state: 'win'
      }
    })

    const span = wrapper.get('span')
    expect(span.text()).toBe('X Wins!')
  })

  it('should show a tie state', () => {
    const wrapper = mount(TicTacToeStatus, {
      props: {
        turn: 'X',
        state: 'tie'
      }
    })

    const span = wrapper.get('span')
    expect(span.text()).toBe('Tie!')
  })
})

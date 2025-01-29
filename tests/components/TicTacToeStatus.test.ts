import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TicTacToeStatus from '~/components/TicTacToeStatus.vue'

const { useTicTacToeMock, restartGameMock } = vi.hoisted(() => {
  return {
    useTicTacToeMock: vi.fn(),
    restartGameMock: vi.fn()
  }
})

useTicTacToeMock.mockImplementation(() => {
  return {
    turn: ref('X'),
    state: ref('active'),
    restartGame: restartGameMock,
  }
})

vi.mock('../../composables/useTicTacToe', () => {
  return {
    useTicTacToe: useTicTacToeMock
  }
})


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

    expect(restartGameMock).toHaveBeenCalledOnce()
  })
  it('should show the current turn', () => {
    const wrapper = mount(TicTacToeStatus)

    const span = wrapper.get('span')
    expect(span.text()).toBe('X\'s Turn')
  })
  it('should show a win state', () => {
    useTicTacToeMock.mockImplementationOnce(() => {
      return {
        turn: ref('X'),
        state: ref('win'),
        restartGame: restartGameMock,
      }
    })

    const wrapper = mount(TicTacToeStatus)

    const span = wrapper.get('span')
    expect(span.text()).toBe('X Wins!')
  })

  it('should show a tie state', () => {
    useTicTacToeMock.mockImplementationOnce(() => {
      return {
        turn: ref('X'),
        state: ref('tie'),
        restartGame: restartGameMock,
      }
    })

    const wrapper = mount(TicTacToeStatus)

    const span = wrapper.get('span')
    expect(span.text()).toBe('Tie!')
  })
})

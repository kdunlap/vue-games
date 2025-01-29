import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import TicTacToeBoard from '~/components/TicTacToeBoard.vue'

const { useTicTacToeMock, isWinningCellMock, selectCellMock } = vi.hoisted(() => {
  return {
    useTicTacToeMock: vi.fn(),
    isWinningCellMock: vi.fn(),
    selectCellMock: vi.fn()
  }
})

useTicTacToeMock.mockImplementation(() => {
  return {
    board: ref([]),
    boardSize: ref(3),
    state: ref('active'),
    isWinningCell: isWinningCellMock,
    selectCell: selectCellMock
  }
})

vi.mock('../../composables/useTicTacToe', () => {
  return {
    useTicTacToe: useTicTacToeMock
  }
})

const stubs = {
  ConfettiExplosion: true
}

describe('TicTacToeBoard.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should render', () => {
    const wrapper = shallowMount(TicTacToeBoard, {
      global: {
        stubs
      }
    })
    expect(wrapper).toBeTruthy()
  })
  it('should show correct number of cells for a 3 x 3 board', () => {
    const boardSize = 3
    useTicTacToeMock.mockImplementationOnce(() => {
      return {
        board: ref(Array.from({ length: boardSize }, () => Array(boardSize).fill(''))),
        boardSize: ref(boardSize),
        state: ref('active'),
        isWinningCell: isWinningCellMock,
        selectCell: selectCellMock
      }
    })

    const wrapper = shallowMount(TicTacToeBoard, {
      global: {
        stubs
      }
    })
    
    const grid = wrapper.get('div[data-test="game-grid"]')

    const buttons = grid.findAll('button')
    expect(buttons.length).toBe(Math.pow(boardSize, 2))
  })
  it('should show correct number of cells for a 4 x 4 board', () => {
    const boardSize = 4
    useTicTacToeMock.mockImplementationOnce(() => {
      return {
        board: ref(Array.from({ length: boardSize }, () => Array(boardSize).fill(''))),
        boardSize: ref(boardSize),
        state: ref('active'),
        isWinningCell: isWinningCellMock,
        selectCell: selectCellMock
      }
    })

    const wrapper = shallowMount(TicTacToeBoard, {
      global: {
        stubs
      }
    })
    
    const grid = wrapper.get('div[data-test="game-grid"]')

    const buttons = grid.findAll('button')
    expect(buttons.length).toBe(Math.pow(boardSize, 2))
  })
  it('should call `selectCell` when a board cell is clicked', async () => {
    const boardSize = 3
    useTicTacToeMock.mockImplementationOnce(() => {
      return {
        board: ref(Array.from({ length: boardSize }, () => Array(boardSize).fill(''))),
        boardSize: ref(boardSize),
        state: ref('active'),
        isWinningCell: isWinningCellMock,
        selectCell: selectCellMock
      }
    })
    const wrapper = shallowMount(TicTacToeBoard, {
      global: {
        stubs
      }
    })

    const button = wrapper.get('div[data-test="game-grid"] button')
    await button.trigger('click')

    await flushPromises()

    expect(selectCellMock).toHaveBeenCalledOnce()
  })
  it('should call `isWinningCell` or every cell', async () => {
    const boardSize = 4
    useTicTacToeMock.mockImplementationOnce(() => {
      return {
        board: ref(Array.from({ length: boardSize }, () => Array(boardSize).fill(''))),
        boardSize: ref(boardSize),
        state: ref('active'),
        isWinningCell: isWinningCellMock,
        selectCell: selectCellMock
      }
    })
    shallowMount(TicTacToeBoard, {
      global: {
        stubs
      }
    })

    expect(isWinningCellMock).toHaveBeenCalledTimes(Math.pow(boardSize, 2))
  })
  it('should show confetti with a win state', async () => {
    const boardSize = 4
    useTicTacToeMock.mockImplementationOnce(() => {
      return {
        board: ref(Array.from({ length: boardSize }, () => Array(boardSize).fill(''))),
        boardSize: ref(boardSize),
        state: ref('win'),
        isWinningCell: isWinningCellMock,
        selectCell: selectCellMock
      }
    })
    const wrapper = mount(TicTacToeBoard, {
      global: {
        stubs: {
          ConfettiExplosion: true
        }
      }
    })


    const confetti = wrapper.findComponent('confetti-explosion-stub')
    expect(confetti.exists()).toBe(true)
  })
})

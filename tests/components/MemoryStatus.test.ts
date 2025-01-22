import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MemoryStatus from '~/components/MemoryStatus.vue'

describe('MemoryStatus.vue', () => {
  it('should render', () => {
    const wrapper = mount(MemoryStatus, {
      props: {
        state: 'inactive'
      }
    })
    expect(wrapper).toBeTruthy()
  })
  it.each([
    ['active', 'Select a card'], 
    ['selecting', 'Select another card'], 
    ['match-found', 'Match Found!'], 
    ['no-match', 'Not a match'], 
    ['win', 'Congrats! You Win!']
  ])('should show status message for `%s` state', (state, expected) => {
    const wrapper = mount(MemoryStatus, {
      props: {
        state
      }
    })
    expect(wrapper.text()).toBe(expected)
  })
})

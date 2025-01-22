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
})

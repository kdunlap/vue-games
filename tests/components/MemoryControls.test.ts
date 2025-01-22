import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MemoryControls from '~/components/MemoryControls.vue'

describe('MemoryControls.vue', () => {
  it('should render', () => {
    const wrapper = mount(MemoryControls)
    expect(wrapper).toBeTruthy()
  })
})

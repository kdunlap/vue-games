import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MemoryCardImage from '~/components/MemoryCardImage.vue'

describe('MemoryCardImage.vue', () => {
  it('should render', () => {
    const wrapper = mount(MemoryCardImage, {
      props: {
        card: { id: 0, value: 'A', coords: { x: 0, y: 0 } }
      }
    })
    expect(wrapper).toBeTruthy()
  })

  it('should output coords as background position', async () => {
    const card = { id: 0, value: 'A', coords: { x: 120, y: 120 } }
    const wrapper = mount(MemoryCardImage, {
      props: {
        card
      }
    })

    expect(wrapper.attributes('style')).toContain(`background-position: -${ card.coords.x }px -${card.coords.y }px`)
    expect(wrapper.attributes('style')).toContain('background-image:')
    expect(wrapper.attributes('style')).toContain(`background-size:`)
  })
})

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonBase from '~/components/ButtonBase.vue'

describe('ButtonBase.vue', () => {
  it('should render', () => {
    const wrapper = mount(ButtonBase)
    expect(wrapper).toBeTruthy()
  })
  it('should repsect the default slot for button text', () => {
    const name = "Test Button"
    const wrapper = mount(ButtonBase, {
      slots: {
        default: name
      }
    })
    expect(wrapper.text()).toBe(name)
  })

  it('should be able to merge classes', () => {
    const className = "test-class"
    const wrapper = mount(ButtonBase, {
      attrs: {
        className: className
      }
    })

    expect(wrapper.attributes('class')).toContain(className)
  })
})

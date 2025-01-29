import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputNumberStepper from '~/components/InputNumberStepper.vue'

describe('InputNumberStepper.vue', () => {
  it('should render', () => {
    const wrapper = mount(InputNumberStepper)
    expect(wrapper).toBeTruthy()
  })
  it('should increment', async () => {
    const wrapper = mount(InputNumberStepper)

    const button = wrapper.get('button[data-test="increment-button"]')
    await button.trigger('click')

    const input = wrapper.get('input')
    expect(input.element.value).toBe('1')
  })
  it('should decrement', async () => {
    const wrapper = mount(InputNumberStepper, {
      props: {
        modelValue: 1
      }
    })

    const button = wrapper.get('button[data-test="decrement-button"]')
    await button.trigger('click')

    const input = wrapper.get('input')
    expect(input.element.value).toBe('0')
  })
  it('should initialize to v-model value', () => {
    const wrapper = mount(InputNumberStepper, {
      props: {
        modelValue: 5
      }
    })

    const input = wrapper.get('input')
    expect(input.element.value).toBe('5')
  })
  it('should update v-model value when changed', async () => {
    const wrapper = mount(InputNumberStepper)

    const button = wrapper.get('button[data-test="increment-button"]')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })
  it('should respect max', async () => {
    const wrapper = mount(InputNumberStepper, {
      props: {
        max: 2
      }
    })

    const button = wrapper.get('button[data-test="increment-button"]')
    await button.trigger('click')
    await button.trigger('click')
    await button.trigger('click')

    const input = wrapper.get('input')
    expect(input.element.value).toBe('2')
  })
  it('should respect min', async () => {
    const wrapper = mount(InputNumberStepper, {
      props: {
        min: 2,
        modelValue: 3
      }
    })

    const button = wrapper.get('button[data-test="decrement-button"]')
    await button.trigger('click')
    await button.trigger('click')
    await button.trigger('click')

    const input = wrapper.get('input')
    expect(input.element.value).toBe('2')
  })
})

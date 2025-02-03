import { fireEvent, render, waitFor } from '@testing-library/react'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'
import { vi } from 'vitest'

const defaultValue = 4
const title = 'title'
const max = 100
const min = 0
let slider
let input
let testValue
const onChange = vi.fn((value) => {
  console.log('onChange triggered with:', value)
  testValue = value
})

describe('Testing slider with input ', async () => {
  it('-> it should renders correctly', () => {
    const { getByRole } = render(
      <SliderWithInput
        data-testid='slider'
        defaultValue={defaultValue}
        max={max}
        min={min}
        onChange={onChange}
        title={title}
      />
    )
    it('-> it should call onChange when slider is moved', () => {
      slider = getByRole('slider')
      fireEvent.mouseDown(slider)
      fireEvent.change(slider, { target: { value: 2 } })
      fireEvent.mouseUp(slider)
      waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
      })
    })
    it('-> it should update inputValue correctly when input value is empty', () => {
      input = getByRole('input')
      fireEvent.change(input, { target: { value: defaultValue } })
      expect(input.value).toBe(defaultValue.toString())
    })
    it('-> it should update prices when input is blurred and input is greater than max value', () => {
      input = getByRole('input')
      fireEvent.mouseDown(input)
      fireEvent.change(input, { target: { value: 130 } })
      fireEvent.mouseUp(input)
      fireEvent.blur(input)
      waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(1)
      })
      expect(input.value).toBe(max.toString())
    })
    it('-> it should not update prices when input is blurred and value in input has not changed', () => {
      input = getByRole('input')
      fireEvent.focusIn(input)
      fireEvent.blur(input)
      expect(input.value).toBe(testValue.toString())
    })
  })
})

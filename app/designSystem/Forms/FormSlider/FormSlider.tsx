import {
  FormControl,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FormControlProps } from '../FormControl/FormControl'

type SliderProps = ComponentProps<typeof Slider>

export type FormSliderProps = {
  formControlProps: FormControlProps
  minValue?: number
  maxValue?: number
  values: {
    min: number
    max: number
  }
} & Omit<SliderProps, 'minValue' | 'maxValue'>

export const FormSlider = ({
  formControlProps,
  onChange,
  values,
  minValue,
  maxValue,
  ...props
}: FormSliderProps) => {
  const handleOnChange = (value: number) => {
    if (!onChange) return
    if (minValue && value < minValue) return

    if (maxValue && value > maxValue) return

    onChange(value)
  }

  return (
    <FormControl {...formControlProps}>
      <Slider
        {...props}
        onChange={handleOnChange}
        minValue={values.min}
        maxValue={values.max}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </FormControl>
  )
}

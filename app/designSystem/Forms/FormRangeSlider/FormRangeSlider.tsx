import { useColorMode, useToken } from '@gluestack-style/react'
import { RangeSlider } from '@react-native-assets/slider'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

export type FormRangeSliderProps = {
  formControlProps: FormControlProps
  minValue?: number
  maxValue?: number
  value: [number, number]
  onChangeMin: (value: number) => void
  onChangeMax: (value: number) => void
}

export const FormRangeSlider = ({
  value,
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
  formControlProps,
}: FormRangeSliderProps) => {
  const isDark = useColorMode() === 'dark'

  const primaryColor = useToken('colors', 'primary500')
  const secondaryColor = useToken(
    'colors',
    isDark ? 'secondary500' : 'secondary300'
  )

  const handleOnChange = ([min, max]: [number, number]) => {
    if (min !== value[0]) {
      onChangeMin(min)
    }

    if (max !== value[1]) {
      onChangeMax(max)
    }
  }

  return (
    <FormControl {...formControlProps}>
      <RangeSlider
        range={value} // set the current slider's value
        minimumValue={minValue} // Minimum value
        maximumValue={maxValue} // Maximum value
        step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
        // minimumRange={0} // Minimum range between the two thumbs (defaults as "step")
        crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
        outboundColor={secondaryColor} // The track color outside the current range value
        inboundColor={primaryColor} // The track color inside the current range value
        thumbTintColor={primaryColor} // The color of the slider's thumb
        // thumbStyle={undefined} // Override the thumb's style
        // trackStyle={undefined} // Override the tracks' style
        // minTrackStyle={undefined} // Override the tracks' style for the minimum range
        // midTrackStyle={undefined} // Override the tracks' style for the middle range
        // maxTrackStyle={undefined} // Override the tracks' style for the maximum range
        // vertical={false} // If true, the slider will be drawn vertically
        // inverted={false} // If true, min value will be on the right, and max on the left
        enabled // If false, the slider won't respond to touches anymore
        trackHeight={4} // The track's height in pixel
        thumbSize={18} // The thumb's size in pixel
        // thumbImage={undefined} // An image that would represent the thumb
        onValueChange={handleOnChange} // Called each time the value changed. The type is (range: [number, number]) => void
        // onSlidingStart={undefined} // Called when the slider is pressed. The type is (range: [number, number]) => void
        // onSlidingComplete={undefined} // Called when the press is released. The type is (range: [number, number]) => void
        // slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
        //   CustomThumb={undefined} // Provide your own component to render the thumb. The type is a component: ({ value: number, thumb: 'min' | 'max' }) => JSX.Element
        //   CustomMark={undefined} // Provide your own component to render the marks. The type is a component: ({ value: number; active: boolean }) => JSX.Element ; value indicates the value represented by the mark, while active indicates wether a thumb is currently standing on the mark
        //   {...props} // Add any View Props that will be applied to the container (style, ref, etc)
      />
    </FormControl>
  )
}

import { useController } from 'react-hook-form'

import { FormRangeSlider, FormRangeSliderProps } from '@/designSystem'

export type FormRangeSliderControlledProps = {
  minName: string
  maxName: string
} & Omit<FormRangeSliderProps, 'value' | 'onChangeMin' | 'onChangeMax'>

export const FormRangeSliderControlled = ({
  minName,
  maxName,
  formControlProps,
  ...props
}: FormRangeSliderControlledProps) => {
  const {
    field: { onChange: onChangeMin, value: minValue },
    fieldState: { error },
  } = useController({ name: minName })

  const {
    field: { onChange: onChangeMax, value: maxValue },
  } = useController({ name: maxName })

  console.log(minName, maxName, [minValue, maxValue])

  return (
    <FormRangeSlider
      formControlProps={{ ...formControlProps, error }}
      onChangeMin={onChangeMin}
      onChangeMax={onChangeMax}
      value={[minValue, maxValue]}
      {...props}
    />
  )
}

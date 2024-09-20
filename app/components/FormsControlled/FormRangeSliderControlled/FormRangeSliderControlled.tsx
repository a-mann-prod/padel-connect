import { useController } from 'react-hook-form'

import { FormRangeSlider, FormRangeSliderProps } from '@/designSystem'

export type FormRangeSliderControlledProps = {
  name: string
} & Omit<FormRangeSliderProps, 'value' | 'onChange'>

export const FormRangeSliderControlled = ({
  name,
  formControlProps,
  ...props
}: FormRangeSliderControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormRangeSlider
      formControlProps={{ ...formControlProps, error }}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

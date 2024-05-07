import { useController } from 'react-hook-form'

import { FormSlider, FormSliderProps } from '@/designSystem'

export type FormSliderControlledProps = {
  name: string
} & Omit<FormSliderProps, 'value' | 'onChange'>

export const FormSliderControlled = ({
  name,
  formControlProps,
  ...props
}: FormSliderControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormSlider
      formControlProps={{ ...formControlProps, error }}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

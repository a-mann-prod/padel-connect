import { useController } from 'react-hook-form'

import { FormRadio, FormRadioProps } from '@/designSystem/Forms'

export type FormRadioControlledProps = {
  name: string
  onChangeAfter?: () => void
} & Omit<FormRadioProps, 'value' | 'onChange'>

export const FormRadioControlled = ({
  name,
  formControlProps,
  onChangeAfter,
  ...props
}: FormRadioControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormRadio
      formControlProps={{ ...formControlProps, error }}
      onChange={(e) => {
        onChange(e)
        onChangeAfter?.()
      }}
      value={value}
      {...props}
    />
  )
}

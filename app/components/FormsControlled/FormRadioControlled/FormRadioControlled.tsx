import { useController } from 'react-hook-form'

import { FormRadio, FormRadioProps } from '@/designSystem/Forms'

export type FormRadioControlledProps = {
  name: string
} & Omit<FormRadioProps, 'value' | 'onChange'>

export const FormRadioControlled = ({
  name,
  formControlProps,
  ...props
}: FormRadioControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormRadio
      formControlProps={{ ...formControlProps, error }}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

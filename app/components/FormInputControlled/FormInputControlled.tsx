import { useController } from 'react-hook-form'

import { FormInput, FormInputProps } from '@/designSystem/Form'

export type FormInputControlledProps = {
  name: string
} & Omit<FormInputProps, 'value' | 'onChangeText'>

export const FormInputControlled = ({
  name,
  formControlProps,
  ...props
}: FormInputControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormInput
      formControlProps={{ ...formControlProps, error }}
      onChangeText={onChange}
      value={value}
      {...props}
    />
  )
}

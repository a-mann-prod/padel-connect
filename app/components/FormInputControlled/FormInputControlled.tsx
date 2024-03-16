import { FormInput, FormInputProps } from '@/designSystem/Form'
import { useController } from 'react-hook-form'

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
      formControlProps={{ ...formControlProps, errorMessage: error?.message }}
      onChangeText={onChange}
      value={value}
      {...props}
    />
  )
}
import { useController } from 'react-hook-form'

import { FormTextarea, FormTextareaProps } from '@/designSystem/Forms'

export type FormTextareaControlledProps = {
  name: string
} & Omit<FormTextareaProps, 'value' | 'onChangeText'>

export const FormTextareaControlled = ({
  name,
  formControlProps,
  ...props
}: FormTextareaControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormTextarea
      formControlProps={{ ...formControlProps, error }}
      onChangeText={onChange}
      value={value}
      {...props}
    />
  )
}

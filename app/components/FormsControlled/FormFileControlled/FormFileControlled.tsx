import { useController } from 'react-hook-form'

import { FormFile, FormFileProps } from '@/designSystem/Forms'

export type FormFileControlledProps = {
  name: string
} & Omit<FormFileProps, 'value' | 'onChange'>

export const FormFileControlled = ({
  name,
  formControlProps,
  ...props
}: FormFileControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormFile
      formControlProps={{ ...formControlProps, error }}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

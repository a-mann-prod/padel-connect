import { useController } from 'react-hook-form'

import { FormAvatar, FormAvatarProps } from '@/designSystem/Forms'

export type FormAvatarControlledProps = {
  name: string
} & Omit<FormAvatarProps, 'value' | 'onChange'>

export const FormAvatarControlled = ({
  name,
  formControlProps,
  ...props
}: FormAvatarControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormAvatar
      formControlProps={{ ...formControlProps, error }}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

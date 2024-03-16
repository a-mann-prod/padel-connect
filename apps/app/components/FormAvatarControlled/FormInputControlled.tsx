import { FormAvatar, FormAvatarProps } from '@/designSystem/Form'
import { useController } from 'react-hook-form'

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
      formControlProps={{ ...formControlProps, errorMessage: error?.message }}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

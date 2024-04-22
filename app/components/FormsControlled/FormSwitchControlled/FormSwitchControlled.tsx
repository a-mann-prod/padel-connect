import { useController } from 'react-hook-form'

import { FormSwitch, FormSwitchProps } from '@/designSystem'

export type FormSwitchControlledProps = {
  name: string
} & Omit<FormSwitchProps, 'value' | 'onToggle'>

export const FormSwitchControlled = ({
  name,
  formControlProps,
  ...props
}: FormSwitchControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormSwitch
      formControlProps={{ ...formControlProps, error }}
      onToggle={onChange}
      value={value}
      {...props}
    />
  )
}

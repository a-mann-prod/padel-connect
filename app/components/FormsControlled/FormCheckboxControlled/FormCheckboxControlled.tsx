import { useController } from 'react-hook-form'

import { FormCheckbox, FormCheckboxProps } from '@/designSystem'

export type FormCheckboxControlledProps = {
  name: string
} & Omit<FormCheckboxProps, 'isChecked' | 'onChange' | 'value'>

export const FormCheckboxControlled = ({
  name,
  formControlProps,
  ...props
}: FormCheckboxControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormCheckbox
      formControlProps={{ ...formControlProps, error }}
      onChange={onChange}
      isChecked={value}
      value={value}
      {...props}
    />
  )
}

import { useController } from 'react-hook-form'

import {
  FormSelect,
  FormSelectProps,
} from '@/designSystem/Forms/FormSelect/FormSelect'

export type FormSelectControlledProps = {
  name: string
} & Omit<FormSelectProps, 'value' | 'onChange'>

export const FormSelectControlled = ({
  name,
  formControlProps,
  ...props
}: FormSelectControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormSelect
      formControlProps={{ ...formControlProps, error }}
      onValueChange={onChange}
      value={value}
      {...props}
    />
  )
}

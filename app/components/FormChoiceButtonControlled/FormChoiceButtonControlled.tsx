import { useController } from 'react-hook-form'

import { FormChoiceButton, FormChoiceButtonProps } from '@/designSystem/Form'

export type FormChoiceButtonControlledProps<TSingle extends boolean> = {
  name: string
} & Omit<FormChoiceButtonProps<TSingle>, 'value' | 'onChange'>

export const FormChoiceButtonControlled = <TSingle extends boolean>({
  name,
  formControlProps,
  ...props
}: FormChoiceButtonControlledProps<TSingle>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormChoiceButton
      formControlProps={{ ...formControlProps, error }}
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

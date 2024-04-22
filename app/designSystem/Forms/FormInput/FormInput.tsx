import { Input, InputField } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { when } from '@/utils/when'

type InputFieldProps = ComponentProps<typeof InputField>

export type FormInputProps = {
  displayPlaceHolder?: boolean
  formControlProps: FormControlProps
  type?: 'number' | 'password' | 'text'
} & Omit<InputFieldProps, 'type'>

export const FormInput = ({
  displayPlaceHolder = false,
  formControlProps,
  onChangeText,
  type,
  ...props
}: FormInputProps) => {
  const handleOnChangeText = (text: string) => {
    if (type === 'number') {
      onChangeText?.(text.replace(/[^0-9]/g, ''))
      return
    }
    onChangeText?.(text)
  }

  return (
    <FormControl {...formControlProps}>
      <Input>
        <InputField
          placeholder={when(displayPlaceHolder, formControlProps.title)}
          onChangeText={handleOnChangeText}
          {...props}
        />
      </Input>
    </FormControl>
  )
}

import { Textarea, TextareaInput } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { when } from '@/utils/when'

type TextareaInputProps = ComponentProps<typeof TextareaInput>

export type FormTextareaProps = {
  displayPlaceHolder?: boolean
  formControlProps: FormControlProps
  type?: 'number' | 'text'
} & Omit<TextareaInputProps, 'type'>

export const FormTextarea = ({
  displayPlaceHolder = false,
  formControlProps,
  onChangeText,
  type,
  h,
  ...props
}: FormTextareaProps) => {
  const handleOnChangeText = (text: string) => {
    if (type === 'number') {
      onChangeText?.(text.replace(/[^0-9]/g, ''))
      return
    }
    onChangeText?.(text)
  }

  return (
    <FormControl {...formControlProps}>
      <Textarea h={h}>
        <TextareaInput
          placeholder={when(displayPlaceHolder, formControlProps.title)}
          onChangeText={handleOnChangeText}
          {...props}
        />
      </Textarea>
    </FormControl>
  )
}

import { HStack, Input, InputField } from '@gluestack-ui/themed'
import { ComponentProps, useState } from 'react'

import { useTranslate } from '@/services/i18n'
import { Platform } from 'react-native'
import { IconButton } from '../IconButton/IconButton'

type InputFieldProps = ComponentProps<typeof InputField>

export type MessageInputProps = Omit<
  InputFieldProps,
  'onChangeText' | 'value'
> & {
  onPress: (value: string) => void
}

export const MessageInput = ({ onPress, ...props }: MessageInputProps) => {
  const t = useTranslate()
  const [value, setValue] = useState<string>('')

  const isDisabled = value.trim().length < 1

  const handleOnPress = () => {
    const trimmedValue = value.trim()
    if (trimmedValue.length < 1) return

    onPress(trimmedValue)
    setValue('')
  }

  return (
    <HStack gap="$3" alignItems="flex-end">
      <Input
        flex={1}
        minHeight="$10"
        h="auto"
        maxHeight="$40"
        alignItems="center"
      >
        <InputField
          placeholder={t('message')}
          onChangeText={setValue}
          value={value}
          multiline
          numberOfLines={Platform.OS !== 'web' ? 1 : 4}
          {...props}
        />
      </Input>
      <IconButton
        icon="FAR-paper-plane"
        onPress={handleOnPress}
        isDisabled={isDisabled}
      />
    </HStack>
  )
}

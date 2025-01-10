import { useTranslate } from '@/services/i18n'
import { Center, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

export type ErrorViewProps = ComponentProps<typeof Center> & {
  message?: string
}

export const ErrorView = ({ message, ...props }: ErrorViewProps) => {
  const t = useTranslate()

  return (
    <Center flex={1} {...props} gap="$3">
      <Text textAlign="center">{message || t('api.errors.default')}</Text>
    </Center>
  )
}

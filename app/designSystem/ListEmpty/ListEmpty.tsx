import { Center, Text } from '@gluestack-ui/themed'

import { Icon } from '../Icon/Icon'

import { useTranslate } from '@/services/i18n'
import { when } from '@/utils/when'

export type ListEmptyProps = {
  inverted?: boolean | null
  title?: string
}

export const ListEmpty = ({ title, inverted }: ListEmptyProps) => {
  const t = useTranslate()

  return (
    <Center flex={1} gap="$3" transform={when(!!inverted, [{ scaleY: -1 }])}>
      <Text>{title || t('noData')}</Text>
      <Icon name="FAR-face-frown-open" size="xl" />
    </Center>
  )
}

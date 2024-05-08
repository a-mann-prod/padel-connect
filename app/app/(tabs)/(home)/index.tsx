import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { TileButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useTranslate } from '@/services/i18n'

export default () => {
  const me = useMe()
  const t = useTranslate()

  return (
    <VStack gap="$5" m="$5">
      <TileButton
        color="$white"
        bgColor="$primary500"
        title={t('navigation.myMatches')}
        icon="FAS-baseball"
        onPress={() => router.navigate('/(tabs)/(home)/my-matches')}
        disabled={!me}
      />
    </VStack>
  )
}

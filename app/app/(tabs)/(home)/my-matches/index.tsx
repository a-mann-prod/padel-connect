import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { WithAuth } from '@/components'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithAuth(() => {
  const t = useTranslate()

  return (
    <VStack flex={1} gap="$3" m="$3" mt="$3">
      <Button
        justifyContent="flex-end"
        title={t('navigation.incomingMatches')}
        iconRight
        size="2xl"
        rounded="$lg"
        onPress={() =>
          router.navigate(routing.homeMyMatchesIncomingMatches.path())
        }
      />
      <Button
        justifyContent="flex-end"
        title={t('navigation.receivedInvitations')}
        iconRight
        size="2xl"
        rounded="$lg"
        onPress={() =>
          router.navigate(routing.homeMyMatchesReceivedInvitations.path())
        }
      />
      <Button
        justifyContent="flex-end"
        title={t('navigation.oldMatches')}
        iconRight
        size="2xl"
        rounded="$lg"
        onPress={() => router.navigate(routing.homeMyMatchesOldMatches.path())}
      />
    </VStack>
  )
})

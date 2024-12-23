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
        justifyContent="space-between"
        title={t('navigation.incomingMatches')}
        iconRight
        size="2xl"
        rounded="$lg"
        onPress={() =>
          router.navigate(routing.homeMyMatchesIncomingMatches.path())
        }
        icon="FAS-calendar-check"
      />
      <Button
        justifyContent="space-between"
        title={t('navigation.receivedInvitations')}
        iconRight
        size="2xl"
        rounded="$lg"
        onPress={() =>
          router.navigate(routing.homeMyMatchesReceivedInvitations.path())
        }
        icon="FAS-envelope"
      />
      <Button
        justifyContent="space-between"
        title={t('navigation.oldMatches')}
        iconRight
        size="2xl"
        rounded="$lg"
        onPress={() => router.navigate(routing.homeMyMatchesOldMatches.path())}
        icon="FAS-clock-rotate-left"
      />
    </VStack>
  )
})

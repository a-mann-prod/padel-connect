import { router } from 'expo-router'

import { MenuImage, WithAuth } from '@/components'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { Box } from '@gluestack-ui/themed'

export default WithAuth(() => {
  const t = useTranslate()

  return (
    <Box flex={1}>
      <MenuImage
        image={require('../../../../assets/images/my_matches_header_background.jpg')}
      >
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
          onPress={() =>
            router.navigate(routing.homeMyMatchesOldMatches.path())
          }
          icon="FAS-clock-rotate-left"
        />
      </MenuImage>
    </Box>
  )
})

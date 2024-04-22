import { Stack } from 'expo-router'

import { WithAuth } from '@/components'
import { HeaderBackButtonProps, IconButton } from '@/designSystem'
import { HeaderButtonContainer } from '@/designSystem/HeaderButtonContainer/HeaderButtonContainer'
import { useTranslate } from '@/services/i18n'

const HeaderFilterButton = ({ tintColor }: HeaderBackButtonProps) => {
  return (
    <HeaderButtonContainer>
      <IconButton
        variant="headerIcon"
        icon="FAS-sliders"
        iconProps={{ size: 16 }}
        onPress={() => console.log('open machin')}
      />
    </HeaderButtonContainer>
  )
}

export default WithAuth(() => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: t('play'), headerRight: HeaderFilterButton }}
      />
      <Stack.Screen name="[match]" options={{ title: t('bookingDetails') }} />
      <Stack.Screen
        name="(modals)"
        options={{ presentation: 'containedModal', headerShown: false }}
      />
    </Stack>
  )
})

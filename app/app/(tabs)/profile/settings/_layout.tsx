import { Stack } from 'expo-router'

import { WithAuth } from '@/components'
import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithAuth(() => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: t('settings'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name={routing.profileSettingsUpdatePersonalInformation.name}
        options={{ title: t('updatePersonalInformation') }}
      />
      <Stack.Screen
        name={routing.profileSettingsUpdatePreferences.name}
        options={{ title: t('updatePreferences') }}
      />
      <Stack.Screen
        name={routing.profileSettingsEmailChange.name}
        options={{ title: t('emailChange') }}
      />
      <Stack.Screen
        name={routing.profileSettingsPasswordChange.name}
        options={{ title: t('passwordChange') }}
      />
      <Stack.Screen
        name={routing.profileSettingsPrivacyPolicy.name}
        options={{ title: t('privacyPolicy') }}
      />
      <Stack.Screen
        name={routing.profileSettingsTermsOfUse.name}
        options={{ title: t('termsOfUse') }}
      />
      <Stack.Screen
        name={routing.profileSettingsDangerZone.name}
        options={{ title: t('dangerZone') }}
      />
    </Stack>
  )
})

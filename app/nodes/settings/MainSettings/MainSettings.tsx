import { HStack, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import Constants from 'expo-constants'
import { router } from 'expo-router'

import { SettingsRow } from '../SettingsRow/SettingsRow'
import { SettingsSection } from '../SettingsSection/SettingsSection'
import { SETTINGS_RACINE, useSettingsItems } from './MainSettings.services'

import { Avatar } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useImage } from '@/services/api/image'
import { useTranslate } from '@/services/i18n'

export const MainSettings = () => {
  const t = useTranslate('settings')
  const { items: settings } = useSettingsItems()

  const { data: me } = useMe()

  const { data: avatar } = useImage({
    params: { path: me?.avatar_url || '-1', storageType: 'avatars' },
    options: { enabled: !!me?.avatar_url },
  })

  if (!me) return

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack p="$3" gap="$3">
        <Avatar
          firstname={me?.first_name}
          lastname={me?.last_name}
          imageUrl={avatar}
          onPress={() =>
            router.navigate(`${SETTINGS_RACINE}/update-personal-information`)
          }
        />
        {settings.map(({ rows, ...sectionProps }, index) => (
          <SettingsSection key={index} {...sectionProps}>
            {rows.map((rowProps, index) => (
              <SettingsRow key={index} {...rowProps} />
            ))}
          </SettingsSection>
        ))}
        <HStack mb="$3" justifyContent="center">
          <Text>
            {t('version', { version: Constants.expoConfig?.version })}
          </Text>
        </HStack>
      </VStack>
    </ScrollView>
  )
}
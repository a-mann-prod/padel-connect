import { HStack, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import Constants from 'expo-constants'

import { SettingsRow } from '../SettingsRow/SettingsRow'
import { SettingsSection } from '../SettingsSection/SettingsSection'
import { useSettingsItems } from './mainSettings.services'

import { FormAvatar, ImageAsset } from '@/designSystem/Form'
import { useMe } from '@/hooks/useMe'
import { useUpdateAvatarMe } from '@/hooks/useUpdateAvatarMe'
import { useTranslate } from '@/services/i18n'
import { prepareFile } from '@/utils/file'

export const MainSettings = () => {
  const t = useTranslate('settings')
  const { items: settings } = useSettingsItems()

  const { data: me } = useMe()

  const { mutate: updateAvatarMe, isPending: isPendingUpdateAvatarMe } =
    useUpdateAvatarMe()

  const handleAvatarChange = async (value: ImageAsset | null) => {
    if (!value) {
      updateAvatarMe()
      return
    }

    const file = await prepareFile(value)
    updateAvatarMe(file)
  }

  if (!me) return

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack p="$3" gap="$3">
        <FormAvatar
          firstname={me.first_name}
          lastname={me.last_name}
          value={me.avatar ? { uri: me.avatar } : undefined}
          onChange={handleAvatarChange}
          isLoading={isPendingUpdateAvatarMe}
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

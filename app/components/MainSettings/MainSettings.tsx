import { HStack, Text, VStack } from '@gluestack-ui/themed'

import { useSettingsItems } from './MainSettings.services'

import { ScrollView, Section, SectionRow } from '@/designSystem'
import { FormAvatar, ImageAsset } from '@/designSystem/Forms'
import { useManageMeAvatar } from '@/hooks/useManageMeAvatar'
import { useMe } from '@/hooks/useMe'
import { config } from '@/services/config'
import { useTranslate } from '@/services/i18n'
import { prepareFile } from '@/utils/file'

export const MainSettings = () => {
  const t = useTranslate('settings')
  const { items: settings } = useSettingsItems()

  const { data: me } = useMe()

  const { deleteAvatar, isPending, updateAvatar } = useManageMeAvatar()

  const handleAvatarChange = async (value: ImageAsset | null) => {
    if (!value) {
      deleteAvatar()
      return
    }

    const file = await prepareFile(value)
    updateAvatar(file)
  }

  if (!me) return

  return (
    <ScrollView>
      <VStack p="$3" gap="$3">
        <FormAvatar
          firstname={me.first_name}
          lastname={me.last_name}
          value={me.avatar_url ? { uri: me.avatar_url } : undefined}
          onChange={handleAvatarChange}
          badgeType="edit"
          isLoading={isPending}
        />
        {settings.map(({ rows, ...sectionProps }, index) => (
          <Section key={index} {...sectionProps}>
            {rows.map((rowProps, index) => (
              <SectionRow key={index} {...rowProps} />
            ))}
          </Section>
        ))}
        <HStack mb="$3" justifyContent="center">
          <Text>{t('version', { version: config.version })}</Text>
        </HStack>
      </VStack>
    </ScrollView>
  )
}

import { ScrollView, Text, VStack } from '@gluestack-ui/themed'

import { Avatar, Section, SectionRow } from '@/designSystem'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export type ProfileProps = {
  user: ProfileWithAvatar
}

export const Profile = ({ user }: ProfileProps) => {
  const t = useTranslate('profile')
  const tGlobal = useTranslate()

  return (
    <ScrollView>
      <VStack p="$3" gap="$3">
        <Avatar
          firstname={user.first_name}
          lastname={user.last_name}
          imageUrl={user.avatar}
        />
        <Section>
          <SectionRow
            title={tGlobal('manualPreference.title')}
            icon="FAR-hand"
            rightComponent={() => (
              <Text>
                {tGlobal(
                  `manualPreference.${user.manual_preference?.toLowerCase()}`
                )}
              </Text>
            )}
          />
          <SectionRow
            title={tGlobal('preferredSide.title')}
            icon="FAS-arrows-left-right"
            rightComponent={() => (
              <Text>
                {tGlobal(
                  `preferredSide.${user.side_preference?.toLowerCase()}`
                )}
              </Text>
            )}
          />
          <SectionRow
            title={t('joined')}
            icon="FAS-signature"
            rightComponent={() =>
              user.created_at && <Text>{date.fromNow(user.created_at)}</Text>
            }
          />
        </Section>
      </VStack>
    </ScrollView>
  )
}

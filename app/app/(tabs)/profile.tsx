import { ScrollView, Text, VStack } from '@gluestack-ui/themed'

import { WithAuth } from '@/components'
import { Avatar, Section, SectionRow } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export default WithAuth(() => {
  const t = useTranslate('profile')
  const tGlobal = useTranslate()

  const { data: me } = useMe()

  if (!me) return

  return (
    <ScrollView>
      <VStack p="$3" gap="$3">
        <Avatar
          firstname={me.first_name}
          lastname={me.last_name}
          imageUrl={me.avatar}
        />
        <Section>
          <SectionRow
            title={tGlobal('manualPreference.title')}
            icon="FAR-hand"
            rightComponent={() => (
              <Text>
                {tGlobal(
                  `manualPreference.${me.manual_preference?.toLowerCase()}`
                )}
              </Text>
            )}
          />
          <SectionRow
            title={tGlobal('preferredSide.title')}
            icon="FAS-arrows-left-right"
            rightComponent={() => (
              <Text>
                {tGlobal(`preferredSide.${me.side_preference?.toLowerCase()}`)}
              </Text>
            )}
          />
          <SectionRow
            title={t('joined')}
            icon="FAS-signature"
            rightComponent={() =>
              me.created_at && <Text>{date.fromNow(me.created_at)}</Text>
            }
          />
        </Section>
      </VStack>
    </ScrollView>
  )
})

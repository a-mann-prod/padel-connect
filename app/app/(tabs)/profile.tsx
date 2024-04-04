import { ScrollView, Text, VStack } from '@gluestack-ui/themed'

import { WithAuth } from '@/components'
import { Avatar } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export default WithAuth(() => {
  const t = useTranslate('profile')

  const { data: me } = useMe()

  if (!me) return

  return (
    <ScrollView>
      <VStack p="$3">
        <Avatar
          firstname={me.first_name}
          lastname={me.last_name}
          imageUrl={me.avatar}
        />
        <Text>
          {me?.created_at && t('joined', { date: date.fromNow(me.created_at) })}
        </Text>
      </VStack>
    </ScrollView>
  )
})

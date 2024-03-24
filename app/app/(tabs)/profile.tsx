import { ScrollView, Text, VStack } from '@gluestack-ui/themed'

import { WithAuth } from '@/components'
import { useAuthContext } from '@/contexts'
import { Avatar } from '@/designSystem'
import { useProfile } from '@/services/api'
import { useImage } from '@/services/api/image'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export default WithAuth(() => {
  const t = useTranslate('profile')
  const { user } = useAuthContext()

  const { data } = useProfile({
    params: { id: user?.id || '-1' },
    options: { enabled: !!user?.id },
  })

  const { data: avatar, isLoading } = useImage({
    params: { path: data?.avatar_url || '-1', storageType: 'avatars' },
    options: { enabled: !!data?.avatar_url },
  })

  if (!data) return

  return (
    <ScrollView>
      <VStack gap="$2" mx="$5">
        <Avatar
          firstname={data?.first_name}
          lastname={data?.last_name}
          imageUrl={avatar}
        />
        <Text>
          {user && t('joined', { date: date.fromNow(user?.created_at) })}
        </Text>
      </VStack>
    </ScrollView>
  )
})

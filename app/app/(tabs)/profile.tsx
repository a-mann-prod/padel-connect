import { WithAuth } from '@/components'
import { useAuthContext } from '@/contexts'
import { Avatar, Button } from '@/designSystem'
import { useProfile } from '@/services/api'
import { useImage } from '@/services/api/image'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { getUserName } from '@/utils/user'
import { ScrollView, Text, VStack } from '@gluestack-ui/themed'

export default WithAuth(() => {
  const t = useTranslate('profile')
  const { user, signOut, isLoadingSignOut } = useAuthContext()

  const { data } = useProfile({
    params: { id: user?.id },
    options: { enabled: !!user?.id },
  })

  const { data: avatar, isLoading } = useImage({
    params: { path: data?.avatar_url, storageType: 'avatars' },
    options: { enabled: !!data?.avatar_url },
  })

  if (!data) return

  return (
    <ScrollView>
      <VStack space="md" m="$5">
        <Avatar
          completeName={getUserName(data?.first_name, data?.last_name)}
          imageUrl={avatar}
        />
        <Text>
          {user && t('joined', { date: date.fromNow(user?.created_at) })}
        </Text>
        <Button
          title="Log out"
          onPress={signOut}
          isLoading={isLoadingSignOut}
        />
      </VStack>
    </ScrollView>
  )
})

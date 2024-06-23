import { useLocalSearchParams } from 'expo-router'

import { Profile } from '@/components'
import { useMe } from '@/hooks/useMe'
import { useProfileWithAvatar } from '@/hooks/useProfileWithAvatar'

export default () => {
  const local = useLocalSearchParams()
  const userId = local?.user as string

  const { data: me } = useMe()

  const isMe = userId === me?.id

  const { data: user, isLoading } = useProfileWithAvatar({
    params: { id: local?.user as string },
    options: { enabled: !isMe || !!userId },
  })

  return (
    <Profile user={isMe ? me : user} isLoading={isLoading} external={!isMe} />
  )
}

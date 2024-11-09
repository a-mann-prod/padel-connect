import { useLocalSearchParams } from 'expo-router'

import { Profile } from '@/components'
import { useMe } from '@/hooks/useMe'
import { useProfile } from '@/services/api'

export default () => {
  const local = useLocalSearchParams()
  const userId = Number(local?.user)

  const { data: me } = useMe()

  const isMe = userId === me?.id

  const { data: user, isLoading } = useProfile({
    params: { id: userId },
    options: { enabled: !isMe || !!userId },
  })

  return (
    <Profile user={isMe ? me : user} isLoading={isLoading} external={!isMe} />
  )
}

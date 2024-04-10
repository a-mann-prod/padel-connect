import { useLocalSearchParams } from 'expo-router'

import { Profile } from '@/components'
import { useProfileWithAvatar } from '@/hooks/useProfileWithAvatar'

export default () => {
  const local = useLocalSearchParams()

  const { data: user } = useProfileWithAvatar({
    params: { id: local?.user as string },
    options: { enabled: !!local?.user },
  })

  if (!user) return

  return <Profile user={user} />
}

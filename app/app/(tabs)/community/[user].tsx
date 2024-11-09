import { useLocalSearchParams } from 'expo-router'

import { Profile } from '@/components'
import { useProfile } from '@/services/api'

export default () => {
  const local = useLocalSearchParams()

  const userId = Number(local?.user)

  const { data: user, isLoading } = useProfile({
    params: { id: userId },
    options: { enabled: !!userId },
  })

  return <Profile user={user} isLoading={isLoading} external />
}

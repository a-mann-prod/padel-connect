import { Profile } from '@/components'
import { useMe } from '@/hooks/useMe'

export default () => {
  const { data: me } = useMe()

  if (!me) return

  return <Profile user={me} />
}

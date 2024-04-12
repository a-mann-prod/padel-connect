import { Profile } from '@/components'
import { useMe } from '@/hooks/useMe'

export default () => {
  const { data: me, isLoading } = useMe()

  return <Profile user={me} isLoading={isLoading} />
}

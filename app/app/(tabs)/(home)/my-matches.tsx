import { Text } from '@gluestack-ui/themed'
import { useMemo } from 'react'

import { useMe } from '@/hooks/useMe'
import { useMatches } from '@/services/api'
import { date } from '@/services/date'
import { isNilOrEmpty } from '@/utils/global'

export default () => {
  const { data: me } = useMe()

  const dates = useMemo(
    () => ({
      start: date.now().toISOString(),
    }),
    []
  )

  const { data: matches } = useMatches({
    params: {
      dates,
    },
    options: {
      enabled: !isNilOrEmpty(me?.id),
    },
  })

  console.log(matches)
  return <Text>My matches</Text>
}

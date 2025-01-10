import { Webview } from '@/components'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'

export default () => {
  const local = useLocalSearchParams()
  const url = local?.url as string | undefined
  const bookingId = Number(local?.bookingid)

  const invalidateQuery = useInvalidateQuery()

  useEffect(() => {
    return () => {
      invalidateQuery(['bookings', bookingId])
      console.log('laaa', bookingId)
    }
  }, [bookingId, invalidateQuery])

  if (!url) return

  return <Webview url={url} />
}

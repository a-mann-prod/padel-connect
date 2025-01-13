import { Webview } from '@/components'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'

export default () => {
  const local = useLocalSearchParams()
  const url = local?.url as string | undefined
  const bookingId = Number(local?.bookingid)

  const invalidateQuery = useInvalidateQuery()

  // pas sur que ca soit util
  useEffect(() => {
    return () => {
      invalidateQuery(['bookings', bookingId])
    }
  }, [bookingId, invalidateQuery])

  if (!url) return

  return <Webview url={url} />
}

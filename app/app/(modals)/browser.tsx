import { Webview } from '@/components'
import { useLocalSearchParams } from 'expo-router'

export default () => {
  const local = useLocalSearchParams()
  const url = local?.url as string | undefined

  if (!url) return

  return <Webview url={url} />
}

import { Webview } from '@/components'

export default () => (
  <Webview url={process.env.EXPO_PUBLIC_TERMS_OF_USE_URL as string} />
)

import { Webview } from '@/components'

export default () => (
  <Webview uri={process.env.EXPO_PUBLIC_TERMS_OF_USE as string} />
)

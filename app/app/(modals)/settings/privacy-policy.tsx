import { Webview } from '@/components'

export default () => (
  <Webview uri={process.env.EXPO_PUBLIC_PRIVACY_POLICY_URL as string} />
)

import { Webview } from '@/components'

export default () => (
  <Webview url={process.env.EXPO_PUBLIC_PRIVACY_POLICY_URL as string} />
)

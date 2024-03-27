import { Platform } from 'react-native'
import { WebView as EWebView } from 'react-native-webview'

export type WebviewProps = {
  url: string
}

export const Webview = ({ url }: WebviewProps) => {
  if (Platform.OS === 'web')
    return <iframe src={url} height="100%" width="100%" />

  return <EWebView source={{ uri: url }} />
}

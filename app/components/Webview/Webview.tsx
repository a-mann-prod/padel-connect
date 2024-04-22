import { useState } from 'react'
import { Platform } from 'react-native'
import { WebView as EWebView } from 'react-native-webview'

import { Loader } from '@/designSystem'

export type WebviewProps = {
  url: string
}

export const Webview = ({ url }: WebviewProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {Platform.OS === 'web' ? (
        <iframe
          src={url}
          height="100%"
          width="100%"
          onLoad={() => setIsLoading(false)}
          style={{ border: 0 }}
        />
      ) : (
        <EWebView source={{ uri: url }} onLoad={() => setIsLoading(false)} />
      )}
      {isLoading && <Loader flex={0} h="$full" />}
    </>
  )
}

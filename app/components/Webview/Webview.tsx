import { Spinner, View } from '@gluestack-ui/themed'
import { useState } from 'react'
import { Platform } from 'react-native'
import { WebView as EWebView } from 'react-native-webview'

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
      {isLoading && (
        <View position="absolute" justifyContent="center" h="$full" w="$full">
          <Spinner />
        </View>
      )}
    </>
  )
}

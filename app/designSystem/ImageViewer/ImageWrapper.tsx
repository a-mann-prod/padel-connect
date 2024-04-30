import { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import {
  ImageWrapper as RNImageWrapper,
  ImageWrapperType as RNImageWrapperType,
} from 'react-native-reanimated-viewer'

export type ImageWrapperProps = Pick<
  RNImageWrapperType,
  'viewerRef' | 'index'
> & {
  uri?: string
  enabled?: boolean
}

export const ImageWrapper = ({
  children,
  uri,
  enabled,
  ...props
}: PropsWithChildren<ImageWrapperProps>) => {
  if (!enabled || !uri) return children

  return (
    <RNImageWrapper
      style={styles.imageWrapper}
      source={{
        uri,
      }}
      {...props}
    >
      {children}
    </RNImageWrapper>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    // width: '100%',
    // height: '100%',
  },
})

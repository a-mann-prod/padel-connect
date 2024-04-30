import { forwardRef } from 'react'
import {
  ImageViewerRef,
  ImageViewer as RNImageViewer,
  ImageViewerProps as RNImageViewerProps,
} from 'react-native-reanimated-viewer'

export type ImageViewerProps = Pick<RNImageViewerProps, 'data'>

export const ImageViewer = forwardRef<ImageViewerRef, ImageViewerProps>(
  (props: ImageViewerProps, ref) => {
    return (
      <RNImageViewer
        ref={ref}
        imageResizeMode="contain"
        shouldCloseViewer={({ gesture }) => gesture !== 'TAP'}
        {...props}
      />
    )
  }
)

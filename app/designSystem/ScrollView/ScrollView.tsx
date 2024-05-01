import { PropsWithChildren, forwardRef } from 'react'
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
} from 'react-native'

export type ScrollViewProps = RNScrollViewProps

export type ScrollViewRef = RNScrollView

export const ScrollView = forwardRef<
  ScrollViewRef,
  PropsWithChildren<ScrollViewProps>
>(({ children, ...props }, ref) => (
  <RNScrollView
    ref={ref}
    keyboardShouldPersistTaps="handled"
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    {...props}
  >
    {children}
  </RNScrollView>
))

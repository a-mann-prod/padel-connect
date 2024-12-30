import {
  KeyboardAvoidingView as GKeyboardAvoidingView,
  View,
} from '@gluestack-ui/themed'
import { useHeaderHeight } from '@react-navigation/elements'
import { PropsWithChildren, useState } from 'react'
import { Platform, StatusBar, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type KeyboardAvoidingViewProps = {
  inModal?: boolean
}

export const KeyboardAvoidingView = ({
  inModal = false,
  children,
}: PropsWithChildren<KeyboardAvoidingViewProps>) => {
  const [viewHeight, setViewHeight] = useState(0)
  const dim = useWindowDimensions()
  const { bottom } = useSafeAreaInsets()

  const headerHeight = useHeaderHeight()
  const KEYBOARD_VERTICAL_OFFSET =
    headerHeight + (StatusBar?.currentHeight || 0)

  return (
    <View
      flex={1}
      zIndex={999}
      onLayout={({
        nativeEvent: {
          layout: { height },
        },
      }) => {
        if (height) setViewHeight(height)
      }}
    >
      <GKeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, zIndex: 999 }}
        keyboardVerticalOffset={
          inModal ? dim.height - viewHeight - bottom : KEYBOARD_VERTICAL_OFFSET
        }
      >
        {children}
      </GKeyboardAvoidingView>
    </View>
  )
}

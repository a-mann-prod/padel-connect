import { when } from '@/utils/when'
import {
  KeyboardAvoidingView as GKeyboardAvoidingView,
  View,
} from '@gluestack-ui/themed'
import { PropsWithChildren, useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, zIndex: 999 }}
        keyboardVerticalOffset={when(inModal, dim.height - viewHeight - bottom)}
      >
        {children}
      </GKeyboardAvoidingView>
    </View>
  )
}

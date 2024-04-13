import { ScrollView as GScrollView } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

export type ScrollViewProps = typeof GScrollView.defaultProps

export const ScrollView = ({
  children,
  ...props
}: PropsWithChildren<ScrollViewProps>) => (
  <GScrollView keyboardShouldPersistTaps="handled" {...props}>
    {children}
  </GScrollView>
)

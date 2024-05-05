import { Text, VStack } from '@gluestack-ui/themed'

import { OverlayWrapperChildrenProps } from '../../OverlayWrapper/OverlayWrapper'

import { Alert } from '@/designSystem'

export type DefaultAlertContentProps = OverlayWrapperChildrenProps & {
  onContinueCallback: () => void
  message: string
}

export const DefaultAlertContent = ({
  hide,
  isOpen,
  message,
  onContinueCallback,
}: DefaultAlertContentProps) => {
  return (
    <Alert
      isOpen={isOpen}
      onCancel={hide}
      onContinueCallback={() => {
        onContinueCallback?.()
        hide()
      }}
    >
      <VStack gap="$3">
        <Text size="sm">{message}</Text>
      </VStack>
    </Alert>
  )
}

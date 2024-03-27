import {
  Toast as GToast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed'

import { isNilOrEmpty } from '@/utils/global'

export type ToastProps = {
  title: string
  message?: string
} & typeof GToast.defaultProps

export const Toast = ({ title, message, ...props }: ToastProps) => (
  <GToast {...props}>
    <VStack space="xs">
      <ToastTitle>{title}</ToastTitle>
      {!isNilOrEmpty(message) && <ToastDescription>{message}</ToastDescription>}
    </VStack>
  </GToast>
)

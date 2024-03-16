import {
  Toast as GToast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed'

export type ToastProps = {
  title: string
  message?: string
} & typeof GToast.defaultProps

export const Toast = ({ title, message, ...props }: ToastProps) => {
  return (
    <GToast {...props}>
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        {message && <ToastDescription>{message}</ToastDescription>}
      </VStack>
    </GToast>
  )
}

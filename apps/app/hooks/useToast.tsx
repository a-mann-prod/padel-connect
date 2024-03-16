import { Toast, ToastProps } from '@/designSystem'
import { useToast as useGToast } from '@gluestack-ui/themed'

const DURATION = 5

export const useToast = () => {
  const { show: showNB, ...rest } = useGToast()

  const show = (props: ToastProps) =>
    showNB({
      placement: 'top',
      duration: DURATION * 1000,
      render: () => <Toast {...props} />,
    })

  return { show, ...rest }
}

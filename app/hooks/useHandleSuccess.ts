import { useToast } from './useToast'

export const useHandleSuccess = () => {
  const toast = useToast()

  return ({ title, message }: { title: string; message?: string }) =>
    toast.show({ title, message, action: 'success' })
}

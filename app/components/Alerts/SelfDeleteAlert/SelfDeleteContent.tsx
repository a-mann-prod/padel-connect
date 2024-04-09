import { Text, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { FormProvider } from '../../FormProvider/FormProvider'
import { FormInputControlled } from '../../FormsControlled/FormInputControlled/FormInputControlled'
import { OverlayWrapperChildrenProps } from '../../OverlayWrapper/OverlayWrapper'
import {
  SelfDeleteFormValues,
  selfDeleteAlertServices,
} from './selfDeleteAlertContent.services'

import { Alert } from '@/designSystem'
import { useDeleteMe } from '@/hooks/useDeleteMe'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = selfDeleteAlertServices

export type SelfDeleteContentAlertProps =
  OverlayWrapperChildrenProps<'selfDeleteAlert'>

export const SelfDeleteContent = ({
  hide,
  isOpen,
}: SelfDeleteContentAlertProps) => {
  const tGlobal = useTranslate()
  const t = useTranslate('settings')

  const methods = useForm({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })
  const { handleSubmit, reset } = methods

  const handleClose = () => {
    hide()
    reset()
  }

  const { mutate, isPending } = useDeleteMe({
    onSuccess: handleClose,
  })

  const onSubmit = (data: SelfDeleteFormValues) => mutate(data)

  return (
    <Alert
      isOpen={isOpen}
      onCancel={handleClose}
      onContinueCallback={handleSubmit(onSubmit)}
      isLoading={isPending}
    >
      <FormProvider {...methods}>
        <VStack gap="$3">
          <Text size="sm">{t('deleteAccountWarningMessage')}</Text>

          <FormInputControlled
            formControlProps={{ title: tGlobal('password') }}
            name="password"
            type="password"
          />
        </VStack>
      </FormProvider>
    </Alert>
  )
}

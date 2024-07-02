import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  NotificationAlertsFormServices,
  NotificationAlertsFormValues,
} from './NotificationAlertsForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import { FormSwitchControlled } from '@/components/FormsControlled/FormSwitchControlled/FormSwitchControlled'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { getDefaultValues, schema } = NotificationAlertsFormServices

export type NotificationAlertsFormProps = {
  defaultValues?: Nillable<NotificationAlertsFormValues>
  onSubmit: (values: NotificationAlertsFormValues) => void
  isLoading?: boolean
  buttonTitle?: string
}

export const NotificationAlertsForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  buttonTitle,
}: NotificationAlertsFormProps) => {
  const tGlobal = useTranslate()

  const defaultValuesMemo = useMemo<NotificationAlertsFormValues>(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<NotificationAlertsFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  return (
    <>
      <FormProvider {...methods}>
        <VStack gap="$2">
          <FormSwitchControlled
            formControlProps={{ title: tGlobal('notification.newMessage') }}
            name="is_new_message_notification_enabled"
          />
          <FormSwitchControlled
            formControlProps={{ title: tGlobal('notification.newMatch') }}
            name="is_new_match_notification_enabled"
          />
        </VStack>
      </FormProvider>
      <Button
        title={buttonTitle || tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </>
  )
}

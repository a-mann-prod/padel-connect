import { Heading, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { reportFormServices, ReportFormValues } from './ReportForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import {
  FormFileControlled,
  FormTextareaControlled,
} from '@/components/FormsControlled'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { getDefaultValues, schema } = reportFormServices

export type ReportFormProps = {
  defaultValues?: Nillable<ReportFormValues>
  onSubmit: (values: ReportFormValues) => void
  onCancelPress: () => void
  isLoading?: boolean
}

export const ReportForm = ({
  onSubmit,
  onCancelPress,
  defaultValues,
  isLoading,
}: ReportFormProps) => {
  const tGlobal = useTranslate()

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<ReportFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  return (
    <VStack flex={1} gap="$3">
      <VStack flex={1} gap="$4">
        <Heading>{tGlobal('reportBug')}</Heading>
        <FormProvider {...methods} containerProps={{ flex: 0 }}>
          <VStack gap="$3">
            <FormTextareaControlled
              displayPlaceHolder
              name="comments"
              formControlProps={{ title: tGlobal('description') }}
              h="$64"
            />
            <FormFileControlled
              name="attachment"
              formControlProps={{ title: tGlobal('screenCapture') }}
            />
          </VStack>
        </FormProvider>
      </VStack>
      <Button
        title={tGlobal('send')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
      <Button
        title={tGlobal('cancel')}
        action="negative"
        onPress={() => onCancelPress()}
      />
    </VStack>
  )
}

import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { MatchFormValues, matchFormServices } from './MatchForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import {
  FormDateTimePickerControlled,
  FormSelectControlled,
} from '@/components/FormsControlled'
import { Button } from '@/designSystem'
import { useDurationItems } from '@/hooks/useDurationItems'
import { useLevelItems } from '@/hooks/useLevelItems'
import { useComplexes } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { getDefaultValues, schema } = matchFormServices

export type MatchFormProps = {
  defaultValues?: Nillable<MatchFormValues>
  onSubmit: (values: MatchFormValues) => void
  isLoading?: boolean
  buttonTitle?: string
}

export const MatchForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  buttonTitle,
}: MatchFormProps) => {
  const tGlobal = useTranslate()
  const t = useTranslate('play')

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<MatchFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit, reset } = methods

  useEffect(() => {
    reset(defaultValuesMemo)
  }, [defaultValuesMemo, reset])

  const levelItems = useLevelItems()
  const durationItems = useDurationItems()

  const { data: complexes } = useComplexes({ params: {} })

  return (
    <>
      <FormProvider {...methods}>
        <VStack gap="$2">
          <FormDateTimePickerControlled
            name="datetime"
            formControlProps={{ title: t('datetime') }}
            minimumDate={date.now().toDate()}
          />
          <FormSelectControlled
            displayPlaceHolder
            name="complex_id"
            formControlProps={{ title: t('complex') }}
            items={
              complexes?.map(({ id, name }) => ({
                value: id.toString(),
                label: name,
              })) || []
            }
          />
          <FormSelectControlled
            displayPlaceHolder
            name="level"
            formControlProps={{ title: tGlobal('level') }}
            items={levelItems}
          />
          <FormSelectControlled
            displayPlaceHolder
            name="duration"
            formControlProps={{ title: t('duration') }}
            items={durationItems}
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

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
import { FormCheckboxControlled } from '@/components/FormsControlled/FormCheckboxControlled/FormCheckboxControlled'
import { Button } from '@/designSystem'
import { useComplexItems } from '@/hooks/useComplexItems'
import { useDurationItems } from '@/hooks/useDurationItems'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { getDefaultValues, schema } = matchFormServices

export type MatchFormProps = {
  defaultValues?: Nillable<MatchFormValues>
  onSubmit: (values: MatchFormValues) => void
  isLoading?: boolean
  buttonTitle?: string
  onCompetitionChange?: (newValue: boolean) => void
}

export const MatchForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  buttonTitle,
  onCompetitionChange,
}: MatchFormProps) => {
  const tGlobal = useTranslate()
  const t = useTranslate('match')

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<MatchFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit, watch } = methods

  const durationItems = useDurationItems()
  const complexItems = useComplexItems()

  const isCompetitive = watch('is_competitive')

  useEffect(() => {
    onCompetitionChange?.(isCompetitive)
  }, [onCompetitionChange, isCompetitive])

  return (
    <VStack flex={1}>
      <FormProvider {...methods}>
        <VStack flex={1} gap="$3">
          <FormDateTimePickerControlled
            name="datetime"
            formControlProps={{ title: t('datetime') }}
            minimumDate={date.now().toDate()}
          />
          <FormSelectControlled
            displayPlaceHolder
            name="complex_id"
            formControlProps={{ title: tGlobal('complex') }}
            items={complexItems}
          />
          <FormSelectControlled
            displayPlaceHolder
            name="duration"
            formControlProps={{ title: t('duration') }}
            items={durationItems}
          />
          <FormCheckboxControlled
            name="is_open_to_all_level"
            formControlProps={{
              title: t('openToAllLevel'),
              helpMessage: t('openToAllLevelHelpMessage', {
                level_min: '3',
                level_max: '6',
              }),
            }}
          />
          <FormCheckboxControlled
            name="is_private"
            formControlProps={{
              title: t('privateMatch'),
              helpMessage: t('privateMatchHelpMessage'),
            }}
          />
          <FormCheckboxControlled
            name="is_competitive"
            formControlProps={{
              title: t('competitiveMatch'),
              helpMessage: t('competitiveMatchHelpMessage'),
            }}
          />
        </VStack>
      </FormProvider>
      <Button
        title={buttonTitle || tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </VStack>
  )
}

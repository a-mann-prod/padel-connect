import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
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
import { useLevelItems } from '@/hooks/useLevelItems'
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
  const t = useTranslate('match')

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<MatchFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const levelItems = useLevelItems()
  const durationItems = useDurationItems()
  const complexItems = useComplexItems()

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
            formControlProps={{ title: tGlobal('complex') }}
            items={complexItems}
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
          <FormCheckboxControlled
            name="is_private"
            formControlProps={{
              title: t('privateMatch'),
              helpMessage: t('privateMatchHelpMessage'),
            }}
          />
          <FormCheckboxControlled
            name="is_competition"
            formControlProps={{
              title: t('competitionMatch'),
              helpMessage: t('competitionMatchHelpMessage'),
            }}
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

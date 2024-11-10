import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  tournamentsFiltersFormServices,
  TournamentsFiltersFormValues,
} from './TournamentsFiltersForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import { FormSelectControlled } from '@/components/FormsControlled'
import { Button } from '@/designSystem'
import { useComplexItems } from '@/hooks/useComplexItems'
import { useMatchTypeItems } from '@/hooks/useMatchTypeItems'
import { useMonthItems } from '@/hooks/useMonthItems'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = tournamentsFiltersFormServices

export type TournamentsFiltersFormProps = {
  defaultValues?: TournamentsFiltersFormValues
  onSubmit: (values: TournamentsFiltersFormValues) => void
  isLoading?: boolean
  buttonTitle?: string
}

export const TournamentsFiltersForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  buttonTitle,
}: TournamentsFiltersFormProps) => {
  const tGlobal = useTranslate()

  const complexItems = useComplexItems()
  const typeItems = useMatchTypeItems()
  const monthItems = useMonthItems()

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<TournamentsFiltersFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  return (
    <>
      <FormProvider {...methods}>
        <VStack gap="$2">
          <FormSelectControlled
            formControlProps={{ title: tGlobal('date') }}
            name="month"
            items={[{ label: tGlobal('all'), value: '' }, ...monthItems]}
          />
          <FormSelectControlled
            formControlProps={{ title: tGlobal('complex') }}
            name="complex"
            items={[{ label: tGlobal('all'), value: '' }, ...complexItems]}
          />
          <FormSelectControlled
            formControlProps={{ title: tGlobal('tournamentType') }}
            name="type"
            items={[{ label: tGlobal('all'), value: '' }, ...typeItems]}
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

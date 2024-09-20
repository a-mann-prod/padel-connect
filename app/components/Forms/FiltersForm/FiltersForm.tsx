import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  FiltersFormServices,
  FiltersFormValues,
  useDisplayLevelHelpMessage,
} from './FiltersForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import {
  FormRangeSliderControlled,
  FormSelectControlled,
} from '@/components/FormsControlled'
import { Button } from '@/designSystem'
import { useComplexItems } from '@/hooks/useComplexItems'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { getDefaultValues, schema } = FiltersFormServices

export type FiltersFormProps = {
  defaultValues?: Nillable<FiltersFormValues> | null
  onSubmit: (values: FiltersFormValues) => void
  isLoading?: boolean
  buttonTitle?: string
}

export const FiltersForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  buttonTitle,
}: FiltersFormProps) => {
  const tGlobal = useTranslate()
  const displayLevelHelpMessage = useDisplayLevelHelpMessage()

  const complexItems = useComplexItems()

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<FiltersFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit, watch } = methods

  return (
    <>
      <FormProvider {...methods}>
        <VStack gap="$2">
          <FormRangeSliderControlled
            name="level_range"
            formControlProps={{
              title: tGlobal('level'),
              helpMessage: displayLevelHelpMessage(watch('level_range')),
            }}
            minValue={0}
            maxValue={10}
          />
          <FormSelectControlled
            formControlProps={{ title: tGlobal('complex') }}
            name="complex_id"
            items={[{ label: tGlobal('none'), value: '' }, ...complexItems]}
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

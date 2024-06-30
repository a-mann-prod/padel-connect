import { Box } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  LevelEstimationFormServices,
  LevelEstimationFormValues,
} from './LevelEstimation.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import {
  FormRadioControlled,
  FormRadioControlledProps,
} from '@/components/FormsControlled'
import { Nillable } from '@/types'

const { getDefaultValues, schema } = LevelEstimationFormServices

export type LevelEstimationFormProps = {
  onSubmit: (values: LevelEstimationFormValues) => void
  options: FormRadioControlledProps['options']
  defaultValues?: Nillable<LevelEstimationFormValues>
}

export const LevelEstimationForm = ({
  onSubmit,
  options,
  defaultValues,
}: LevelEstimationFormProps) => {
  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<LevelEstimationFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit, reset } = methods

  useEffect(() => {
    reset(defaultValuesMemo)
  }, [defaultValuesMemo, reset])

  return (
    <Box p="$3">
      <FormProvider {...methods}>
        <FormRadioControlled
          formControlProps={{}}
          name="level"
          options={options}
          onTouchEnd={handleSubmit(onSubmit)}
        />
      </FormProvider>
    </Box>
  )
}

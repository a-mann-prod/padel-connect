import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  matchScoreFormServices,
  MatchScoreFormValues,
} from './MatchScoreForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import { FormInputControlled } from '@/components/FormsControlled'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'
import { iterate } from '@/utils/array'

const { getDefaultValues, schema } = matchScoreFormServices

export type MatchScoreFormProps = {
  defaultValues?: Nillable<MatchScoreFormValues>
  onSubmit: (values: MatchScoreFormValues) => void
  isLoading?: boolean
  buttonTitle?: string
}

export const MatchScoreForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  buttonTitle,
}: MatchScoreFormProps) => {
  const tGlobal = useTranslate()

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<MatchScoreFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit, watch } = methods

  // gérer avec le watch les de tie breaks

  return (
    <VStack gap="$4">
      <FormProvider {...methods} containerProps={{ flex: 0 }}>
        <VStack gap="$3">
          <Text>Sets</Text>
          <HStack gap="$3" flexGrow={1}>
            {iterate(3).map((index) => (
              <FormInputControlled
                key={index}
                formControlProps={{ flexGrow: 1 }}
                name={`set_${index + 1}_team_1`}
              />
            ))}
          </HStack>
          <HStack gap="$3">
            {iterate(3).map((index) => (
              <FormInputControlled
                key={index}
                formControlProps={{ flexGrow: 1 }}
                name={`set_${index + 1}_team_2`}
              />
            ))}
          </HStack>

          <Text>Tiebreaks</Text>
          <HStack gap="$3" flexGrow={1}>
            {iterate(3).map((index) => (
              <FormInputControlled
                key={index}
                formControlProps={{ flexGrow: 1 }}
                name={`tie_break_${index + 1}_team_1`}
              />
            ))}
          </HStack>
          <HStack gap="$3" flexGrow={1}>
            {iterate(3).map((index) => (
              <FormInputControlled
                key={index}
                formControlProps={{ flexGrow: 1 }}
                name={`tie_break_${index + 1}_team_2`}
              />
            ))}
          </HStack>
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

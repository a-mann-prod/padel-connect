import { Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  FormChoiceButtonControlled,
  FormProvider,
  FormSliderControlled,
} from '@/components'
import { MatchFilters, useMatchFiltersContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { LEVEL_MAX, LEVEL_MIN } from '@/hooks/useLevelItems'
import { useTranslate } from '@/services/i18n'

const levelValues = {
  min: LEVEL_MIN,
  max: LEVEL_MAX,
}

type FiltersFormValues = {
  reserved?: string | null
  minLevel: number
  maxLevel: number
}

export default () => {
  const { matchFilters, defaultMatchFilters, setMatchFilters } =
    useMatchFiltersContext()
  const tGlobal = useTranslate()
  const t = useTranslate('play')
  const methods = useForm<FiltersFormValues>({
    defaultValues: getDefaultValues(defaultMatchFilters),
  })

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = methods

  const minLevel = watch('minLevel')
  const maxLevel = watch('maxLevel')

  useEffect(() => {
    reset(getDefaultValues(matchFilters), { keepDefaultValues: true })
  }, [matchFilters, reset])

  const onSubmit = (data: FiltersFormValues) => {
    setMatchFilters(formatToMatchFilters(data))
    router.back()
  }

  useHeaderButton({
    side: 'headerRight',
    icon: 'FAS-trash',
    onPress: () => reset(),
    isDisabled: !isDirty,
  })

  return (
    <VStack gap="$3" mx="$3" m="$3">
      <FormProvider {...methods}>
        <VStack gap="$3">
          <FormChoiceButtonControlled
            formControlProps={{}}
            name="reserved"
            options={[
              { label: t('booked'), value: 'true' },
              { label: t('notBooked'), value: 'false' },
            ]}
            single
          />
          <Text>
            {tGlobal('level')} {displayLevel(minLevel, maxLevel)}
          </Text>
          <FormSliderControlled
            formControlProps={{ m: '$3' }}
            name="minLevel"
            values={levelValues}
            minValue={LEVEL_MIN}
            maxValue={maxLevel}
          />
          <FormSliderControlled
            formControlProps={{ m: '$3' }}
            name="maxLevel"
            values={levelValues}
            minValue={minLevel}
            maxValue={LEVEL_MAX}
          />
        </VStack>
      </FormProvider>
      <Button
        title={tGlobal('apply')}
        onPress={handleSubmit(onSubmit)}
        icon="FAS-check"
        iconRight
      />
    </VStack>
  )
}

const getDefaultValues = (props: MatchFilters): FiltersFormValues => ({
  reserved: props.reserved?.toString(),
  minLevel: props.level.min,
  maxLevel: props.level.max,
})

const formatToMatchFilters = (props: FiltersFormValues): MatchFilters => ({
  level: {
    min: props.minLevel,
    max: props.maxLevel,
  },
  reserved: props.reserved ? props.reserved === 'true' : undefined,
})

const displayLevel = (minLevel: number, maxLevel: number) => {
  if (minLevel === maxLevel) return minLevel

  return [minLevel, maxLevel].join(' - ')
}

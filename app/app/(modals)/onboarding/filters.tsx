import { router } from 'expo-router'

import { FiltersForm, KeyboardAvoidingView } from '@/components'
import { FiltersFormValues } from '@/components/Forms/FiltersForm/FiltersForm.services'
import { useOnboardingContext } from '@/contexts'
import { Container } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { getLevel, getLevelRange } from '@/utils/level'

export default () => {
  const tGlobal = useTranslate()

  const { filters, setFilters, level } = useOnboardingContext()

  const handleOnSubmit = (values: FiltersFormValues) => {
    setFilters(values)
    router.navigate(routing.onboardingGetStarted.path())
  }

  return (
    <KeyboardAvoidingView>
      <Container>
        <FiltersForm
          defaultValues={{
            level_min: level ? getLevelRange(getLevel(level))[0] : undefined,
            level_max: level ? getLevelRange(getLevel(level))[1] : undefined,
            ...filters,
          }}
          onSubmit={handleOnSubmit}
          buttonTitle={tGlobal('next')}
        />
      </Container>
    </KeyboardAvoidingView>
  )
}

import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { FiltersForm, KeyboardAvoidingView } from '@/components'
import { FiltersFormValues } from '@/components/Forms/FiltersForm/FiltersForm.services'
import { useOnboardingContext } from '@/contexts'
import { ScrollView } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { getLevel } from '@/utils/level'

export default () => {
  const tGlobal = useTranslate()

  const { filters, setFilters, level } = useOnboardingContext()

  const handleOnSubmit = (values: FiltersFormValues) => {
    setFilters(values)
    router.navigate(routing.onboardingGetStarted.path())
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <FiltersForm
            defaultValues={{ is_my_level_range: true, ...filters }}
            onSubmit={handleOnSubmit}
            buttonTitle={tGlobal('next')}
            overrideLevel={level ? getLevel(level) : undefined}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

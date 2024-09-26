import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { KeyboardAvoidingView, TournamentsFiltersForm } from '@/components'
import { TournamentsFiltersFormValues } from '@/components/Forms/TournamentsFiltersForm/TournamentsFiltersForm.services'
import { useFiltersContext } from '@/contexts'
import { ScrollView } from '@/designSystem'

export default () => {
  const { tournamentsFilters, setTournamentsFilters } = useFiltersContext()

  const handleOnSubmit = (values: TournamentsFiltersFormValues) => {
    setTournamentsFilters(values)
    router.canGoBack() && router.back()
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <TournamentsFiltersForm
            onSubmit={handleOnSubmit}
            defaultValues={tournamentsFilters}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

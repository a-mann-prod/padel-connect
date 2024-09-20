import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { FiltersForm, KeyboardAvoidingView } from '@/components'
import {
  FiltersFormServices,
  FiltersFormValues,
} from '@/components/Forms/FiltersForm/FiltersForm.services'
import { useFiltersContext } from '@/contexts'
import { ScrollView } from '@/designSystem'

const { formatToParams, formatToFormValues } = FiltersFormServices

export default () => {
  const { filters, saveFilters } = useFiltersContext()

  const handleOnSubmit = (values: FiltersFormValues) => {
    saveFilters(formatToParams(values))
    router.canGoBack() && router.back()
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <FiltersForm
            onSubmit={handleOnSubmit}
            defaultValues={formatToFormValues(filters)}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

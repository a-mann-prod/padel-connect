import { router } from 'expo-router'

import { FiltersForm, KeyboardAvoidingView } from '@/components'
import {
  FiltersFormServices,
  FiltersFormValues,
} from '@/components/Forms/FiltersForm/FiltersForm.services'
import { useFiltersContext } from '@/contexts'
import { Container } from '@/designSystem'

const { formatToParams, formatToFormValues } = FiltersFormServices

export default () => {
  const { filters, saveFilters } = useFiltersContext()

  const handleOnSubmit = (values: FiltersFormValues) => {
    saveFilters(formatToParams(values))
    router.canGoBack() && router.back()
  }

  return (
    <KeyboardAvoidingView>
      <Container>
        <FiltersForm
          onSubmit={handleOnSubmit}
          defaultValues={formatToFormValues(filters)}
        />
      </Container>
    </KeyboardAvoidingView>
  )
}

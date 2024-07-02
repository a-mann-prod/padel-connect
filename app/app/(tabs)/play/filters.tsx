import { VStack } from '@gluestack-ui/themed'

import { FiltersForm, KeyboardAvoidingView } from '@/components'
import {
  FiltersFormServices,
  FiltersFormValues,
} from '@/components/Forms/FiltersForm/FiltersForm.services'
import { ScrollView } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMe } from '@/hooks/useMe'
import { useMyMatchFilters } from '@/hooks/useMyMatchFilters'
import { useUpdateMatchFilter } from '@/services/api'

const { formatToParams, formatToFormValues } = FiltersFormServices

export default () => {
  const { data: me } = useMe()

  const { data } = useMyMatchFilters()

  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const { mutate: updateMatchFilter, isPending } = useUpdateMatchFilter({
    onSuccess,
    onError,
  })

  const handleOnSubmit = (values: FiltersFormValues) =>
    updateMatchFilter({ user_id: me?.id, ...formatToParams(values) })

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <FiltersForm
            onSubmit={handleOnSubmit}
            isLoading={isPending}
            defaultValues={formatToFormValues(data)}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

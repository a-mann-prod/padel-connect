import { ScrollView, VStack } from '@gluestack-ui/themed'

import {
  KeyboardAvoidingView,
  PreferencesForm,
  PreferencesFormValues,
} from '@/components'
import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMe } from '@/hooks/useMe'
import { useUpdateMe } from '@/hooks/useUpdateMe'

export default () => {
  const { data } = useMe()

  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const { mutate: updateMe, isPending } = useUpdateMe({
    onSuccess,
    onError,
  })

  const handleOnSubmit = (values: PreferencesFormValues) => updateMe(values)

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <PreferencesForm
            onSubmit={handleOnSubmit}
            isLoading={isPending}
            defaultValues={data}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

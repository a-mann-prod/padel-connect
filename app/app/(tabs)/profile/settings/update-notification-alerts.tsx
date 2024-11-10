import { VStack } from '@gluestack-ui/themed'

import {
  KeyboardAvoidingView,
  NotificationAlertsForm,
  NotificationAlertsFormValues,
} from '@/components'
import { ScrollView } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMe } from '@/hooks/useMe'
import { useUpdateMeProfile } from '@/services/api'

export default () => {
  const { data } = useMe()

  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const { mutate: updateMe, isPending } = useUpdateMeProfile({
    options: {
      onSuccess: () => onSuccess(),
      onError,
    },
  })

  const handleOnSubmit = (values: NotificationAlertsFormValues) =>
    updateMe(values)

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <NotificationAlertsForm
            onSubmit={handleOnSubmit}
            isLoading={isPending}
            defaultValues={data}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

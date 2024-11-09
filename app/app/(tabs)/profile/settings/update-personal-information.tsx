import { VStack } from '@gluestack-ui/themed'

import {
  KeyboardAvoidingView,
  PersonalInfoForm,
  PersonalInfoFormValues,
} from '@/components'
import { ScrollView } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useUpdateMeProfile } from '@/services/api'

export default () => {
  const { data } = useMe()

  const { mutate: updateMe, isPending } = useUpdateMeProfile()

  const handleOnSubmit = (values: PersonalInfoFormValues) => updateMe(values)

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <PersonalInfoForm
            onSubmit={handleOnSubmit}
            isLoading={isPending}
            defaultValues={data}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

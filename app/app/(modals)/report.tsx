import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import * as Sentry from '@sentry/react-native'
import { router } from 'expo-router'

import {
  KeyboardAvoidingView,
  ReportForm,
  ReportFormValues,
} from '@/components'
import { ActionsheetProps, ScrollView } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { getArray8, prepareFile } from '@/utils/file'

export type ReportActionsheetProps = ActionsheetProps

export default () => {
  const { data: me } = useMe()

  const onSubmit = async ({ attachment, ...data }: ReportFormValues) => {
    Sentry.withScope(async (scope) => {
      scope.clearAttachments()
      if (attachment) {
        const file = prepareFile(attachment)
        const data = await getArray8(attachment.uri)
        scope.addAttachment({
          data,
          filename: file.name,
          contentType: file.type,
        })
      }

      Sentry.captureMessage(`User feedback: ${data.comments}`, {
        user: { email: data.email, username: data.name },
        extra: {
          comments: data.comments,
        },
      })
    })

    router.canGoBack() && router.back()
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView flex={1}>
          <VStack flex={1} gap="$3" m="$5">
            <ReportForm
              onCancelPress={() => router.canGoBack() && router.back()}
              onSubmit={onSubmit}
              defaultValues={{
                email: me?.email,
                name: `${me?.first_name} ${me?.last_name}`,
              }}
            />
          </VStack>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

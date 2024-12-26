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
import { useToast } from '@/hooks/useToast'
import { useTranslate } from '@/services/i18n'
import { getArray8, prepareFile } from '@/utils/file'

export type ReportActionsheetProps = ActionsheetProps

export default () => {
  const t = useTranslate()
  const { data: me } = useMe()
  const { show } = useToast()

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

      const sentryId = Sentry.captureMessage('User feedback')
      Sentry.captureUserFeedback({ event_id: sentryId, ...data })

      // Sentry.captureMessage(`User feedback: ${data.comments}`, {
      //   user: { email: data.email, username: data.name },
      //   extra: {
      //     comments: data.comments,
      //   },
      // })
    })

    show({ title: t('reportSent'), action: 'success' })

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

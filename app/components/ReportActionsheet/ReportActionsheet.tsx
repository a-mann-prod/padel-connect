import { VStack } from '@gluestack-ui/themed'
import * as Sentry from '@sentry/react-native'

import { ReportForm, ReportFormValues } from '../Forms'

import { Actionsheet, ActionsheetProps } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { getArray8, prepareFile } from '@/utils/file'

export type ReportActionsheetProps = ActionsheetProps

export const ReportActionsheet = ({ ...props }: ReportActionsheetProps) => {
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

    props.onClose?.()
  }

  return (
    <Actionsheet {...props}>
      <VStack py="$3" gap="$6">
        <ReportForm
          onSubmit={onSubmit}
          defaultValues={{
            email: me?.email,
            name: `${me?.first_name} ${me?.last_name}`,
          }}
        />
      </VStack>
    </Actionsheet>
  )
}

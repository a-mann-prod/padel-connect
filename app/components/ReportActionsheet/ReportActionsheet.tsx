import { VStack } from '@gluestack-ui/themed'
import * as Sentry from '@sentry/react-native'

import { ReportForm, ReportFormValues } from '../Forms'

import { Actionsheet, ActionsheetProps } from '@/designSystem'
import { useMe } from '@/hooks/useMe'

export type ReportActionsheetProps = ActionsheetProps

export const ReportActionsheet = ({ ...props }: ReportActionsheetProps) => {
  const { data: me } = useMe()

  const event_id = Sentry.captureMessage('User Feedback')

  const isLoading = false

  const onSubmit = (data: ReportFormValues) =>
    Sentry.captureUserFeedback({ event_id, ...data })

  return (
    <Actionsheet {...props}>
      <VStack py="$3" gap="$6">
        <ReportForm
          isLoading={isLoading}
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

import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import {
  KeyboardAvoidingView,
  NotificationAlertsForm,
  NotificationAlertsFormValues,
} from '@/components'
import { useOnboardingContext } from '@/contexts'
import { ScrollView } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const tGlobal = useTranslate()
  const { notificationAlerts, setNotificationAlerts } = useOnboardingContext()

  const handleOnSubmit = (notificationAlerts: NotificationAlertsFormValues) => {
    setNotificationAlerts(notificationAlerts)

    if (notificationAlerts.is_new_match_notification_enabled) {
      router.navigate(routing.onboardingFilters.path())
    } else {
      router.navigate(routing.onboardingGetStarted.path())
    }
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <NotificationAlertsForm
            defaultValues={{
              is_new_match_notification_enabled: true,
              is_new_message_notification_enabled: true,
              ...notificationAlerts,
            }}
            onSubmit={handleOnSubmit}
            buttonTitle={tGlobal('next')}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

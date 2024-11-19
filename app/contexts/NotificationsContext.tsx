import * as ExpoNotifications from 'expo-notifications'
import { router } from 'expo-router'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { useMe } from '@/hooks/useMe'
import { useReadNotification, useUpdateMe } from '@/services/api'
import { Language } from '@/services/api/types'
import { buildContext } from '@/services/buildContext'
import { i18n } from '@/services/i18n'
import {
  registerForPushNotificationsAsync,
  sendNotification,
} from '@/services/notifications'
import { isNilOrEmpty } from '@/utils/global'

type NotificationsContextProps = {
  sendNotification: () => void
  notification: ExpoNotifications.Notification | undefined
}

const [_, Provider, useNotificationsContext] =
  buildContext<NotificationsContextProps>('NotificationsContextProps')

export { useNotificationsContext }

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
  const { data: me } = useMe()
  const { mutate } = useUpdateMe()

  const invalidateQuery = useInvalidateQuery()

  const { mutate: readNotification } = useReadNotification()

  const [expoPushToken, setExpoPushToken] = useState<string>('')
  const [hasRegisteredPushNotifications, setHasRegisteredPushNotifications] =
    useState(false)
  const [notification, setNotification] = useState<
    ExpoNotifications.Notification | undefined
  >(undefined)

  const notificationListener = useRef<ExpoNotifications.Subscription>()
  const responseListener = useRef<ExpoNotifications.Subscription>()

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .finally(() => setHasRegisteredPushNotifications(true))

    // listener when notification appears
    notificationListener.current =
      ExpoNotifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)

        invalidateQuery(['notifications'])
      })

    // notification reponse listener on notification click
    responseListener.current =
      ExpoNotifications.addNotificationResponseReceivedListener(
        ({ notification }) => {
          const data = notification.request.content.data

          if (data?.id) readNotification({ id: data.id })
          if (data?.url) router.navigate(data.url)
        }
      )

    return () => {
      notificationListener.current &&
        ExpoNotifications.removeNotificationSubscription(
          notificationListener.current
        )
      responseListener.current &&
        ExpoNotifications.removeNotificationSubscription(
          responseListener.current
        )
    }
  }, [invalidateQuery, readNotification])

  // add push token and langage to backend
  useEffect(() => {
    if (!me?.id || !hasRegisteredPushNotifications) return

    if (isNilOrEmpty(expoPushToken))
      mutate({ language: i18n().language.toLocaleUpperCase() as Language })

    mutate({
      push_token: expoPushToken,
      language: i18n().language.toLocaleUpperCase() as Language,
    })
  }, [expoPushToken, hasRegisteredPushNotifications, me?.id, mutate])

  return (
    <Provider
      value={{
        notification,
        sendNotification: () => sendNotification(expoPushToken),
      }}
    >
      {children}
    </Provider>
  )
}

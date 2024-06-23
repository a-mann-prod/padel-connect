import * as ExpoNotifications from 'expo-notifications'
import { router } from 'expo-router'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { useMe } from '@/hooks/useMe'
import { useUpdateMe } from '@/hooks/useUpdateMe'
import { GetMatchesParams, useUpdateNotification } from '@/services/api'
import { buildContext } from '@/services/buildContext'
import { i18n } from '@/services/i18n'
import {
  registerForPushNotificationsAsync,
  sendNotification,
} from '@/services/notifications'
import { isNilOrEmpty } from '@/utils/global'

export type Notifications = Omit<GetMatchesParams, 'dates'>

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

  const { mutate: mutateNotification } = useUpdateNotification()

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<
    ExpoNotifications.Notification | undefined
  >(undefined)

  const notificationListener = useRef<ExpoNotifications.Subscription>()
  const responseListener = useRef<ExpoNotifications.Subscription>()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token ?? '')
    )

    notificationListener.current =
      ExpoNotifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    // notification reponse listener on notification click
    responseListener.current =
      ExpoNotifications.addNotificationResponseReceivedListener(
        ({ notification }) => {
          const data = notification.request.content.data

          if (data?.id) mutateNotification({ id: data.id, is_read: true })
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
  }, [])

  // add push token and langage to backend
  useEffect(() => {
    if (!me?.id) return

    if (isNilOrEmpty(expoPushToken)) mutate({ language: i18n().language })

    mutate({ push_token: expoPushToken, language: i18n().language })
  }, [expoPushToken, me?.id, mutate])

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

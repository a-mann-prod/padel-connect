import * as ExpoNotifications from 'expo-notifications'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { useMe } from '@/hooks/useMe'
import { useUpdateMe } from '@/hooks/useUpdateMe'
import { GetMatchesParams } from '@/services/api'
import { buildContext } from '@/services/buildContext'
import { i18n } from '@/services/i18n'
import {
  registerForPushNotificationsAsync,
  sendNotification,
} from '@/services/notifications'

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
    // .catch((error: any) => setExpoPushToken(`${error}`))

    notificationListener.current =
      ExpoNotifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      ExpoNotifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

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
    console.log('ici')
    if (!me?.id) return

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

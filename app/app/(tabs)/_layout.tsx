import { useAuthContext } from '@/contexts'
import { Icon } from '@/designSystem'
import { useIsNavigationReady } from '@/hooks/useIsNavigationReady'
import { useProfile } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  const isNavigationReady = useIsNavigationReady()

  const { user } = useAuthContext()
  const { data, isLoading } = useProfile({
    params: { id: user?.id },
    options: { enabled: !!user?.id },
  })

  if (!isNavigationReady || isLoading) return

  // redirect to onboarding if user connected and not completed
  if (data && !data.is_onboarding_completed)
    return <Redirect href="/(modals)/onboarding/personal-information" />

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size }) => (
            <Icon size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color, size }) => (
            <Icon size={size} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

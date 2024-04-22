import { Redirect, Tabs } from 'expo-router'
import React from 'react'

import { Icon } from '@/designSystem'
import { useIsNavigationReady } from '@/hooks/useIsNavigationReady'
import { useMe } from '@/hooks/useMe'

export default () => {
  const isNavigationReady = useIsNavigationReady()

  const { data: me, isLoading } = useMe()

  if (!isNavigationReady || isLoading) return

  // redirect to onboarding if user connected and not completed
  if (me && !me.is_onboarding_completed)
    return <Redirect href="/(modals)/onboarding/personal-information" />

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="FAS-house" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="FAS-baseball" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="FAS-users" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="FAS-user" size="md" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

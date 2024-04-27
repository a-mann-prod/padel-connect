import { Tabs, router } from 'expo-router'
import React, { useEffect } from 'react'

import { Icon } from '@/designSystem'
import { useMe } from '@/hooks/useMe'

export default () => {
  const { data: me, isLoading } = useMe()

  useEffect(() => {
    if (!isLoading && me && !me.is_onboarding_completed) {
      router.replace('/(modals)/onboarding/personal-information')
    }
  }, [isLoading, me])

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

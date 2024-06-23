import { useToken } from '@gluestack-style/react'
import { Tabs, router } from 'expo-router'
import React, { useEffect } from 'react'

import { Icon } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { routing } from '@/services/routing'

export default () => {
  const { data: me, isLoading } = useMe()

  useEffect(() => {
    if (!isLoading && me && !me.is_onboarding_completed) {
      router.replace(routing.onboardingPersonalInformation.path())
    }
  }, [isLoading, me])

  return (
    <Tabs
      initialRouteName={routing.home.name}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarBadgeStyle: {
          backgroundColor: useToken('colors', 'red500'),
        },
      }}
    >
      <Tabs.Screen
        name={routing.home.name}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="FAS-house" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={routing.play.name}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="FAS-baseball" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={routing.community.name}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="FAS-users" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={routing.profile.name}
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

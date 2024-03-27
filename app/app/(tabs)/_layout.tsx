import { HeaderBackButtonProps } from '@react-navigation/elements'
import { Redirect, Tabs, router } from 'expo-router'
import React from 'react'

import { Icon, IconButton } from '@/designSystem'
import { useIsNavigationReady } from '@/hooks/useIsNavigationReady'
import { useMe } from '@/hooks/useMe'
import { useTranslate } from '@/services/i18n'

const displayEditButton = ({ tintColor }: HeaderBackButtonProps) => (
  <IconButton
    variant="headerIcon"
    icon="gear"
    iconProps={{ color: tintColor, size: 'lg' }}
    onPress={() => router.navigate('/(modals)/settings')}
  />
)

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  const isNavigationReady = useIsNavigationReady()

  const { data: me, isLoading } = useMe()

  if (!isNavigationReady || isLoading) return

  // redirect to onboarding if user connected and not completed
  if (me && !me.is_onboarding_completed)
    return <Redirect href="/(modals)/onboarding/personal-information" />

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, focused }) => (
            <Icon name="house" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color }) => (
            <Icon name="user" size="md" color={color} />
          ),
          headerRight: (props) => me && displayEditButton(props),
        }}
      />
    </Tabs>
  )
}

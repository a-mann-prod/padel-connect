import { HeaderBackButtonProps } from '@react-navigation/elements'
import { Redirect, Tabs, router } from 'expo-router'
import React from 'react'

import { Icon, IconButton } from '@/designSystem'
import { HeaderButtonContainer } from '@/designSystem/HeaderButtonContainer/HeaderButtonContainer'
import { useIsNavigationReady } from '@/hooks/useIsNavigationReady'
import { useMe } from '@/hooks/useMe'
import { useTranslate } from '@/services/i18n'

const HeaderEditButton = ({ tintColor }: HeaderBackButtonProps) => {
  const { data: me } = useMe()

  if (!me) return

  return (
    <HeaderButtonContainer>
      <IconButton
        variant="headerIcon"
        icon="FAS-gear"
        iconProps={{ size: 16 }}
        onPress={() => router.navigate('/(modals)/settings')}
      />
    </HeaderButtonContainer>
  )
}

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
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon name="FAS-house" size="md" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={`${focused ? 'FAS' : 'FAR'}-user`}
              size="md"
              color={color}
            />
          ),
          headerRight: HeaderEditButton,
        }}
      />
    </Tabs>
  )
}

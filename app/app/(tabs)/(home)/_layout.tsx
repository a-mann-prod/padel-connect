import { Stack } from 'expo-router'

import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: t('home'),
          headerShown: false,
          // header: () => (
          //   <Box w="$full" h={Dimensions.get('window').height / 4}>
          //     <Image
          //       flex={1}
          //       w="$full"
          //       alt="home-header-background"
          //       source={require('../../../assets/images/home-header-background.jpg')}
          //       resizeMode="cover"
          //     />
          //     {/* <Box
          //       position="absolute"
          //       bgColor="transparent"
          //       right={0}
          //       left={0}
          //       top={0}
          //       bottom={0}
          //       borderStyle="solid"
          //       borderLeftWidth={Dimensions.get('window').width}
          //       borderRightWidth={0}
          //       borderBottomWidth={50}
          //       borderLeftColor="transparent"
          //       borderRightColor="transparent"
          //       borderBottomColor={backgroundColor}
          //     /> */}
          //   </Box>
          // ),
        }}
      />
      <Stack.Screen
        name={routing.homeMyMatches.name}
        options={{ title: t('myMatches') }}
      />
      <Stack.Screen
        name={routing.homeNotifications.name}
        options={{
          title: t('notifications'),
        }}
      />
      <Stack.Screen
        name={routing.homeTournaments.name}
        options={{ title: t('tournaments') }}
      />
      <Stack.Screen
        name={routing.homeTournamentDetail.name}
        options={{ title: '' }}
      />
    </Stack>
  )
}

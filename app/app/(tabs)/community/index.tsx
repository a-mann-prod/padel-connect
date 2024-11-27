import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { SearchUser } from '@/components'
import { routing } from '@/services/routing'

export default () => {
  return (
    <VStack flex={1} m="$3">
      <SearchUser
        onPress={(id) => router.navigate(routing.communityUser.path(id))}
      />
    </VStack>
  )
}

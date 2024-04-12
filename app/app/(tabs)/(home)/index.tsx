import { Heading, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { TileButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'

export default () => {
  const { data: me } = useMe()

  return (
    <VStack gap="$5" m="$5">
      <Heading>Hello, {me?.first_name} !</Heading>
      <TileButton
        disabled
        color="$white"
        bgColor="$primary500"
        title="Créer une partie"
        icon="FAS-baseball"
      />
      <TileButton
        color="$white"
        bgColor="$amber500"
        title="Rechercher un joueur"
        icon="FAS-magnifying-glass"
        onPress={() => router.navigate('/(tabs)/(home)/find-player')}
      />
    </VStack>
  )
}

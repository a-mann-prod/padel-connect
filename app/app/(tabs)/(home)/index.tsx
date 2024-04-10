import { Heading, Text, VStack, VirtualizedList } from '@gluestack-ui/themed'
import { Link } from 'expo-router'

import { TileButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useProfiles } from '@/services/api'

export default () => {
  const { data: me } = useMe()

  const { data: users } = useProfiles({
    params: { current_user_id: me?.id as string },
    options: { enabled: !!me?.id },
  })

  if (!users?.length) return

  return (
    <VStack gap="$5" m="$5">
      <Heading>Hello, {me?.first_name} !</Heading>
      <TileButton
        color="$white"
        bgColor="$primary500"
        title="Créer une partie"
        icon="FAR-clock"
      />
      <TileButton
        color="$white"
        bgColor="$amber500"
        title="Rechercher un joueur"
        icon="FAS-magnifying-glass"
      />

      <VirtualizedList
        data={users}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Link href={`/(home)/${item.id}`}>
            <Text key={index}>{item.first_name}</Text>
          </Link>
        )}
      />
    </VStack>
  )
}

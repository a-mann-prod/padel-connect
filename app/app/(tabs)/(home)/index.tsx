import { Heading, VStack } from '@gluestack-ui/themed'

import { TileButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'

export default () => {
  const { data: me } = useMe()

  return (
    <VStack gap="$5" m="$5">
      {me && <Heading>Hello, {me?.first_name} !</Heading>}
      <TileButton
        color="$white"
        bgColor="$primary500"
        title="Evenements"
        icon="FAS-calendar-days"
      />
    </VStack>
  )
}

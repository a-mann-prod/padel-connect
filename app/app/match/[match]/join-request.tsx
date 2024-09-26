import { VStack } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

import { MatchRequestButton, WithAuth, WithMatch } from '@/components'
import { Button } from '@/designSystem'
import { useManageMatch } from '@/hooks/useManageMatch'

export default WithAuth(
  WithMatch(() => {
    const local = useLocalSearchParams()
    const matchId = Number(local?.match)

    const {
      isRequesting,
      requestMatch,
      cancelRequestMatch,
      isRequestMatchPending,
      isCancelRequestMatchPending,
    } = useManageMatch(matchId)

    //match compet -> ajouter un partenaire
    //other match Ajouter un ou plusieurs partenaires

    return (
      <VStack flex={1} gap="$3" m="$3">
        {/* Listing des joueurs ajoutés avec possibilité de les supprimer */}
        <Button
          title="Taper ici pour ajouter un ou plusieurs partenaires"
          onPress={() => console.log('ouvre la select des partenaires')}
          variant="outline"
          flex={1}
        />

        <MatchRequestButton
          onPress={requestMatch}
          onCancelPress={cancelRequestMatch}
          isRequesting={isRequesting}
          isLoading={isRequestMatchPending || isCancelRequestMatchPending}
        />
      </VStack>
    )
  })
)

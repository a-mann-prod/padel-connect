import { VStack } from '@gluestack-ui/themed'

import { Actionsheet, ActionsheetProps } from '@/designSystem'
import { MatchResponse, useUpdateMatch } from '@/services/api'
import { MatchScoreForm } from '../Forms'
import { matchScoreFormServices } from '../Forms/MatchScoreForm/MatchScoreForm.services'

const { formatToFormValues, formatToParams } = matchScoreFormServices

export type MatchScoreActionsheetProps = ActionsheetProps & {
  match?: MatchResponse
  matchId: number
}

export const MatchScoreActionsheet = ({
  match,
  matchId,
  ...props
}: MatchScoreActionsheetProps) => {
  const { mutate: update, isPending } = useUpdateMatch({
    options: {
      onSuccess: () => props.onClose?.(),
    },
  })

  return (
    <Actionsheet {...props}>
      <VStack p="$2" gap="$3">
        <MatchScoreForm
          onSubmit={(data) =>
            update({ id: matchId, score_data: formatToParams(data) })
          }
          defaultValues={
            match?.score_data ? formatToFormValues(match.score_data) : undefined
          }
          isLoading={isPending}
        />
      </VStack>
    </Actionsheet>
  )
}

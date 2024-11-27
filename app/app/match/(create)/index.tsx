import { useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

import { MatchForm, MatchFormValues } from '@/components'
import { useCreateMatchContext } from '@/contexts/CreateMatchContext'
import { Container } from '@/designSystem'
import { formDateTimePickerServices } from '@/designSystem/Forms/FormDateTimePicker/FormDateTimePicker.services'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { Nillable } from '@/types'

const { formatWithNextMinuteInterval } = formDateTimePickerServices

export default () => {
  const local = useLocalSearchParams()
  const datetime = local?.datetime as string | undefined

  const tGlobal = useTranslate()
  const t = useTranslate('match')
  const { isPendingCreateMatch, setFormValues } = useCreateMatchContext()

  const defaultValues: Nillable<MatchFormValues> = {
    datetime: formatWithNextMinuteInterval(
      date.dayjs(datetime).toDate()
    ).toISOString(),
  }

  const [isCompetition, setIsCompetition] = useState(false)

  // TODO UN TRUC AVEC CA
  const queryClient = useQueryClient()
  const test = queryClient.getQueriesData({ queryKey: ['matches', 'infinite'] })
  test.forEach(([queryKey]) => console.log({ queryKey }))

  return (
    <Container>
      <MatchForm
        onCompetitionChange={setIsCompetition}
        onSubmit={(data) => {
          setFormValues(data)

          if (isCompetition) {
            router.navigate(routing.matchCreateAddPartner.path())
          } else {
            router.navigate(routing.matchCreateShareMatch.path())
          }
        }}
        defaultValues={defaultValues}
        buttonTitle={isCompetition ? t('chooseMyPartner') : tGlobal('create')}
        isLoading={isPendingCreateMatch}
      />
    </Container>
  )
}

import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

import { MatchForm, MatchFormValues } from '@/components'
import { useCreateMatchContext } from '@/contexts/CreateMatchContext'
import { Button, Container } from '@/designSystem'
import { formDateTimePickerServices } from '@/designSystem/Forms/FormDateTimePicker/FormDateTimePicker.services'
import { useMe } from '@/hooks/useMe'
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
  const { data: me } = useMe()
  const { createMatch, isPendingCreateMatch, setFormValues } =
    useCreateMatchContext()

  const defaultValues: Nillable<MatchFormValues> = {
    datetime: formatWithNextMinuteInterval(
      date.dayjs(datetime).toDate()
    ).toISOString(),
    level: me?.calculated_level?.toString(),
  }

  const [isCompetition, setIsCompetition] = useState(false)

  return (
    <>
      <Container>
        <MatchForm
          onCompetitionChange={setIsCompetition}
          onSubmit={(data) => {
            if (isCompetition) {
              setFormValues(data)
              router.navigate(routing.matchCreateAddPartner.path())
            } else {
              createMatch(data)
            }
          }}
          defaultValues={defaultValues}
          buttonTitle={isCompetition ? t('chooseMyPartner') : tGlobal('create')}
          isLoading={isPendingCreateMatch}
        />
        <Button
          title="test book fields"
          onPress={() => router.navigate(routing.matchCreateBookField.path())}
        />
      </Container>
    </>
  )
}

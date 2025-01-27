import { router } from 'expo-router'
import { useState } from 'react'

import { MatchForm, MatchFormValues, MatchRecap } from '@/components'
import { useCreateMatchContext } from '@/contexts/CreateMatchContext'
import { Container } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useComplexes } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { Nillable } from '@/types'

export default () => {
  const tGlobal = useTranslate()
  const t = useTranslate('match')
  const { data: me } = useMe()
  const {
    createMatch,
    isPendingCreateMatch,
    bookingFieldFormValues,
    setFormValues,
  } = useCreateMatchContext()

  const defaultValues: Nillable<MatchFormValues> = {
    ...bookingFieldFormValues,
  }

  const [isCompetition, setIsCompetition] = useState(false)

  const { data: complexes } = useComplexes()
  const complexName = complexes?.results.find(
    (c) => c.id.toString() === bookingFieldFormValues?.complex_id
  )?.name

  return (
    <>
      <Container>
        {bookingFieldFormValues && complexName && (
          <MatchRecap
            complexName={complexName}
            datetime={bookingFieldFormValues.datetime}
            duration={bookingFieldFormValues.duration}
            fieldName={bookingFieldFormValues.four_padel_field_name}
            isBooked={false}
            isFieldAvailable
          />
        )}
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
          ownerLevel={me?.calculated_level}
        />
      </Container>
    </>
  )
}

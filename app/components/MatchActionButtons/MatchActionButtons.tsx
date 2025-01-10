import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { Button } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { BookingResponse, useBooking, useCreateBooking } from '@/services/api'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { BookingStatus } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { useEffect, useState } from 'react'
import { useUpdateMatchCache } from './MatchActionButtons.services'

type MatchActionButtonsProps = {
  matchId: number
  bookingId?: number
  onLeaveButtonPress: () => void
  isLeaveButtonLoading: boolean

  isPlayer: boolean
  isOwner: boolean
}

export const MatchActionButtons = ({
  matchId,
  bookingId,

  isOwner,
  isPlayer,

  onLeaveButtonPress,
  isLeaveButtonLoading,
}: MatchActionButtonsProps) => {
  const t = useTranslate('match')
  const { data: me } = useMe()
  const updateMatchCache = useUpdateMatchCache()
  const queryCache = useQueryCache()

  const [previousBooking, setPreviousBooking] =
    useState<BookingResponse | null>(null)
  const [currentBooking, setCurrentBooking] = useState<BookingResponse | null>(
    null
  )

  // a tester
  console.log('terrible', previousBooking, currentBooking)
  console.log('match', queryCache.getItem(['matches', matchId]))

  const { data: booking, isLoading: isLoadingBooking } = useBooking({
    params: { id: bookingId as number },
    options: { enabled: !!bookingId },
  })

  const { mutate: createBooking, isPending: isPendingCreateBooking } =
    useCreateBooking({
      options: {
        onSuccess: ({ id, payment_link }) =>
          router.navigate(
            routing.matchPayMatch.path(matchId, payment_link, id)
          ),
      },
    })

  const isParticipant = isOwner || isPlayer
  const isPayButtonLoading = isLoadingBooking || isPendingCreateBooking
  const hasPayed = booking?.participations.some(
    ({ user }) => user === me?.four_padel_id
  )

  useEffect(() => {
    if (!booking) return

    setPreviousBooking(currentBooking) // Update previousBooking
    setCurrentBooking(booking) // Set the latest booking

    if (
      previousBooking &&
      previousBooking.id === booking.id &&
      previousBooking.booking_status === BookingStatus.PRE_BOOKED &&
      booking.booking_status === BookingStatus.PAYABLE
    ) {
      updateMatchCache(matchId)
    }
  }, [booking, currentBooking, matchId, previousBooking, updateMatchCache])

  return (
    <VStack gap="$3">
      {isOwner &&
        (!booking || booking.booking_status === BookingStatus.CANCELLED) && (
          <Button
            title={t('book')}
            icon="FAS-money-bill"
            iconRight
            action="positive"
            onPress={() => createBooking({ match: matchId })}
            isLoading={isPayButtonLoading}
          />
        )}
      {isParticipant &&
        booking?.booking_status &&
        [BookingStatus.PAYABLE, BookingStatus.PRE_BOOKED].includes(
          booking.booking_status
        ) &&
        !hasPayed && (
          <Button
            title={t('pay')}
            icon="FAS-money-bill"
            iconRight
            action="positive"
            onPress={() =>
              router.navigate(
                routing.matchPayMatch.path(
                  matchId,
                  booking.payment_link,
                  booking.id
                )
              )
            }
            isLoading={isPayButtonLoading}
          />
        )}

      {isParticipant && (
        <>
          <Button
            title={t('chat')}
            icon="FAS-message"
            iconRight
            action="warning"
            onPress={() => router.navigate(routing.matchChat.path(matchId))}
          />
          {/* <Button
                title={t('enterScore')}
                icon="FAS-award"
                iconRight
              /> */}
        </>
      )}
      {isPlayer && (
        <Button
          title={t('leave')}
          action="negative"
          icon="FAS-person-walking-arrow-right"
          iconRight
          onPress={onLeaveButtonPress}
          isLoading={isLeaveButtonLoading}
        />
      )}
    </VStack>
  )
}

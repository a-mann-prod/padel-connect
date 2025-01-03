import { HStack, Text, VStack } from '@gluestack-ui/themed'

import {
  Avatar,
  IconButton,
  Loader,
  ScrollView,
  Section,
  SectionRow,
} from '@/designSystem'
import { useManageFavoriteUser } from '@/hooks/useManageFavoriteUser'
import { useMe } from '@/hooks/useMe'
import { ProfileResponse } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { isNilOrEmpty } from '@/utils/global'

export type ProfileProps = {
  user?: ProfileResponse
  isLoading?: boolean
  external?: boolean
}

export const Profile = ({ user, isLoading, external }: ProfileProps) => {
  const t = useTranslate('profile')
  const tGlobal = useTranslate()
  const { data: me } = useMe()

  const { toggleFavorite, isLoading: isLoadingFavorite } =
    useManageFavoriteUser(user)

  if (isLoading) return <Loader />

  if (!user) return

  return (
    <ScrollView>
      <VStack p="$3" gap="$3">
        <Avatar
          firstname={user.first_name}
          lastname={user.last_name}
          fullName={user.full_name}
          imageUrl={user.avatar_url}
          viewerEnabled
        />
        {external && me && (
          <HStack gap="$3" justifyContent="center">
            <IconButton
              icon={user.is_favorite ? 'FAS-star' : 'FAR-star'}
              onPress={() => toggleFavorite()}
              isLoading={isLoadingFavorite}
              isDisabled={!me}
            />
          </HStack>
        )}
        <Section>
          <SectionRow
            title={tGlobal('manualPreference.title')}
            icon="FAR-hand"
            rightComponent={() => (
              <Text>
                {tGlobal(
                  `manualPreference.${user.manual_preference?.toLowerCase()}`
                ) || tGlobal('unknown')}
              </Text>
            )}
          />
          <SectionRow
            title={tGlobal('sidePreference.title')}
            icon="FAS-arrows-left-right"
            rightComponent={() => (
              <Text>
                {tGlobal(
                  `sidePreference.${user.side_preference?.toLowerCase()}`
                ) || tGlobal('unknown')}
              </Text>
            )}
          />
          <SectionRow
            title={tGlobal('level')}
            icon="FAS-dumbbell"
            rightComponent={() => (
              <Text>
                {isNilOrEmpty(user?.calculated_level)
                  ? tGlobal('unknown')
                  : user.calculated_level}
              </Text>
            )}
          />
          <SectionRow
            title={t('joined')}
            icon="FAS-signature"
            rightComponent={() =>
              user.created_at && <Text>{date.fromNow(user.created_at)}</Text>
            }
          />
        </Section>
      </VStack>
    </ScrollView>
  )
}

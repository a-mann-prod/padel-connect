import { HStack, ScrollView, Text, VStack } from '@gluestack-ui/themed'

import { Avatar, IconButton, Loader, Section, SectionRow } from '@/designSystem'
import { useManageFavoriteUser } from '@/hooks/useManageFavoriteUser'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export type ProfileProps = {
  user?: ProfileWithAvatar
  isLoading?: boolean
  external?: boolean
}

export const Profile = ({ user, isLoading, external }: ProfileProps) => {
  const t = useTranslate('profile')
  const tGlobal = useTranslate()

  const {
    isFavorite,
    toggleFavorite,
    isLoading: isLoadingFavorite,
  } = useManageFavoriteUser(user?.id)

  if (isLoading) return <Loader />

  if (!user) return

  return (
    <ScrollView>
      <VStack p="$3" gap="$3">
        <Avatar
          firstname={user.first_name}
          lastname={user.last_name}
          imageUrl={user.avatar}
        />
        {external && (
          <HStack gap="$3" justifyContent="center">
            <IconButton
              icon={isFavorite ? 'FAS-star' : 'FAR-star'}
              iconProps={{}}
              onPress={() => toggleFavorite()}
              isLoading={isLoadingFavorite}
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
                )}
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
                )}
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

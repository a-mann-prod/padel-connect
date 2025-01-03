import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  AvatarGroup,
  Box,
  HStack,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native'

import { PlayerListItem } from '../PlayerListItem/PlayerListItem'
import { SubItem } from '../SubItem/SubItem'

import {
  Avatar,
  Icon,
  IconButton,
  IconButtonProps,
  PressableProps,
} from '@/designSystem'
import { MatchTeamInvitationResponse } from '@/services/api'
import { routing } from '@/services/routing'

export type TeamListItemProps = {
  onPress?: PressableProps['onPress']
  onSelectButtonPress?: IconButtonProps['onPress']
  request?: {
    isLoading: boolean
    onAcceptPress: () => void
    onRefusePress: () => void
  }
  invitations: MatchTeamInvitationResponse[]
}

export const TeamListItem = ({ invitations, request }: TeamListItemProps) => {
  if (invitations.length === 1) {
    return (
      <PlayerListItem
        {...invitations[0].user}
        requestStatus={invitations[0].status}
        request={request}
        onPress={() =>
          router.navigate(routing.matchUser.path(10, invitations[0].user.id))
        }
      />
    )
  }

  const users = invitations.map(({ user }) => user)

  const favoritesCount = users.reduce(
    (acc, curr) => acc + (curr.is_favorite ? 1 : 0),
    0
  )

  return (
    <Accordion
      flex={1}
      variant="unfilled"
      type="single"
      isCollapsible
      isDisabled={false}
    >
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <HStack
                  flex={1}
                  gap="$5"
                  variant="colored"
                  p="$3"
                  rounded="$lg"
                  alignItems="center"
                >
                  {users.length > 1 && (
                    <Box w="$5" alignItems="center">
                      <Icon
                        name={isExpanded ? 'FAS-caret-down' : 'FAS-caret-right'}
                        size="xl"
                        color="$primary500"
                      />
                    </Box>
                  )}
                  <AvatarGroup>
                    {users.map(({ id, avatar_url, first_name, last_name }) => (
                      <Avatar
                        key={id}
                        size="md"
                        imageUrl={avatar_url}
                        firstname={first_name}
                        lastname={last_name}
                      />
                    ))}
                  </AvatarGroup>
                  <HStack flex={1} gap="$2" justifyContent="center">
                    <SubItem
                      text={favoritesCount?.toString()}
                      icon="FAS-star"
                    />
                  </HStack>

                  {request && (
                    <HStack
                      gap="$4"
                      justifyContent="center"
                      alignItems="center"
                      flex={2 / 3}
                    >
                      {request.isLoading ? (
                        <ActivityIndicator />
                      ) : (
                        <>
                          <IconButton
                            icon="FAR-circle-check"
                            action="positive"
                            onPress={() => request.onAcceptPress()}
                            iconProps={{ size: '2xl' }}
                            variant="link"
                            //@ts-ignore:next-line
                            h="none"
                          />
                          <IconButton
                            icon="FAR-circle-xmark"
                            action="negative"
                            onPress={() => request.onRefusePress()}
                            iconProps={{ size: '2xl' }}
                            variant="link"
                            //@ts-ignore:next-line
                            h="none"
                          />
                        </>
                      )}
                    </HStack>
                  )}
                </HStack>
              )
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent
          gap="$2"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          {invitations.map(({ id, user, status }) => (
            <PlayerListItem
              key={id}
              {...user}
              requestStatus={status}
              onPress={() =>
                router.navigate(routing.matchUser.path(10, user.id))
              }
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

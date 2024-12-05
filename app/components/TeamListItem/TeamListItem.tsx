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

import {
  Avatar,
  Icon,
  IconButton,
  IconButtonProps,
  PressableProps,
} from '@/designSystem'
import { MatchTeamResponse } from '@/services/api'
import { routing } from '@/services/routing'
import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { PlayerListItem } from '../PlayerListItem/PlayerListItem'
import { SubItem } from '../SubItem/SubItem'

export type TeamListItemProps = MatchTeamResponse & {
  onPress?: PressableProps['onPress']
  onSelectButtonPress?: IconButtonProps['onPress']
  matchRequest?: {
    isLoading: boolean
    onAcceptPress: (id: number | undefined) => void
    onRefusePress: (id: number | undefined) => void
  }
}

export const TeamListItem = ({
  id,
  participants,
  calculated_level,

  matchRequest,
}: TeamListItemProps) => {
  if (participants.length === 1) {
    return (
      <PlayerListItem
        {...participants[0]}
        isRequest
        matchRequest={matchRequest}
        onPress={() =>
          router.navigate(routing.matchUser.path(10, participants[0].id))
        }
      />
    )
  }

  const favoritesCount = participants.reduce(
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
                  {participants.length > 1 && (
                    <Box w="$5" alignItems="center">
                      <Icon
                        name={isExpanded ? 'FAS-caret-down' : 'FAS-caret-right'}
                        size="xl"
                        color="$primary500"
                      />
                    </Box>
                  )}
                  <AvatarGroup>
                    {participants.map(({ id, avatar_url }) => (
                      <Avatar key={id} size="md" imageUrl={avatar_url} />
                    ))}
                  </AvatarGroup>
                  <HStack flex={1} gap="$2" justifyContent="center">
                    <SubItem
                      text={calculated_level?.toString()}
                      icon="FAS-dumbbell"
                    />
                    <SubItem
                      text={favoritesCount?.toString()}
                      icon="FAS-star"
                    />
                  </HStack>

                  {matchRequest && (
                    <HStack
                      gap="$4"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {matchRequest.isLoading ? (
                        <ActivityIndicator />
                      ) : (
                        <>
                          <IconButton
                            icon="FAR-circle-check"
                            action="positive"
                            onPress={() => matchRequest.onAcceptPress(id)}
                            iconProps={{ size: '2xl' }}
                            variant="link"
                            //@ts-ignore:next-line
                            h="none"
                          />
                          <IconButton
                            icon="FAR-circle-xmark"
                            action="negative"
                            onPress={() => matchRequest.onRefusePress(id)}
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
          {participants.map((participant) => (
            <PlayerListItem
              key={participant.id}
              {...participant}
              isRequest
              onPress={() =>
                router.navigate(routing.matchUser.path(10, participant.id))
              }
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

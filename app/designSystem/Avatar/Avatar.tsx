import {
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Center,
  Avatar as GAvatar,
  Heading,
  VStack,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { isEmpty } from 'remeda'

import { getInitials, getUserName } from '@/utils/user'
import { Icon } from '../Icon/Icon'

export type AvatarProps = {
  imageUrl?: string
  firstname?: string | null
  lastname?: string | null
  status?: 'online' | 'offline' | 'hidden'
  onPress?: TouchableOpacityProps['onPress']
} & typeof GAvatar.defaultProps

export const Avatar = ({
  imageUrl,
  status = 'hidden',
  onPress,
  firstname,
  lastname,
  ...props
}: AvatarProps) => {
  const [isLoading, setIsLoading] = useState(!!imageUrl)
  const completeName = getUserName(firstname, lastname)

  const displayFallback = () => {
    if (completeName && !isEmpty(completeName))
      return (
        <AvatarFallbackText>
          {getInitials(firstname, lastname)}
        </AvatarFallbackText>
      )

    return <Icon name="FAS-user" color="white" size="lg" />
  }

  return (
    <VStack alignItems="center" gap="$3">
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <GAvatar size="2xl" {...props}>
          {imageUrl ? (
            <AvatarImage
              alt="avatar"
              source={{ uri: imageUrl }}
              onLoad={() => setIsLoading(false)}
            />
          ) : (
            displayFallback()
          )}
          {onPress && (
            <AvatarBadge bgColor="$blueGray500">
              <Center flex={1}>
                <Icon name="FAS-pen" color="$white" size="xs" />
              </Center>
            </AvatarBadge>
          )}
        </GAvatar>
      </TouchableOpacity>

      <Heading size="lg">{completeName}</Heading>
    </VStack>
  )
}

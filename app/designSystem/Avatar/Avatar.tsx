import {
  AvatarFallbackText,
  AvatarImage,
  Avatar as GAvatar,
  Heading,
  VStack,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { isEmpty } from 'remeda'

import { Icon } from '../Icon/Icon'

import { getInitials, getUserName } from '@/utils/user'

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

    return <Icon name="user" color="white" size={48} />
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <VStack alignItems="center" gap="$3">
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
        </GAvatar>
        <Heading size="lg">{completeName}</Heading>
      </VStack>
    </TouchableOpacity>
  )
}

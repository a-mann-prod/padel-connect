import {
  AvatarBadge,
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

export type AvatarProps = {
  imageUrl?: string
  completeName?: string
  status?: 'online' | 'offline' | 'hidden'
  onPress?: TouchableOpacityProps['onPress']
} & typeof GAvatar.defaultProps

export const Avatar = ({
  imageUrl,
  completeName,
  status = 'hidden',
  onPress,
  ...props
}: AvatarProps) => {
  const [isLoading, setIsLoading] = useState(!!imageUrl)

  const displayFallback = () => {
    if (!isEmpty(completeName))
      return <AvatarFallbackText>{completeName}</AvatarFallbackText>

    return <Icon name="user" color="white" size={48} />
  }

  return (
    <VStack alignItems="center">
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
          {status !== 'hidden' && <AvatarBadge />}
          {onPress && (
            <AvatarBadge
              justifyContent="center"
              alignItems="center"
              bgColor="$secondary400"
            >
              <Icon name="cogs" color="white" />
            </AvatarBadge>
          )}
        </GAvatar>
        <Heading size="lg">{completeName}</Heading>
      </TouchableOpacity>
    </VStack>
  )
}

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

import { Icon, IconProps } from '../Icon/Icon'
import { Skeleton } from '../Skeleton/Skeleton'

import { isNilOrEmpty } from '@/utils/global'
import { getInitials, getUserName } from '@/utils/user'

export type AvatarProps = {
  imageUrl?: string
  firstname?: string | null
  lastname?: string | null
  status?: 'online' | 'offline' | 'hidden'
  onPress?: TouchableOpacityProps['onPress']
  isLoading?: boolean
  fallBackIcon?: IconProps['name']
} & typeof GAvatar.defaultProps

export const Avatar = ({
  imageUrl,
  status = 'hidden',
  onPress,
  firstname,
  lastname,
  isLoading,
  fallBackIcon,
  ...props
}: AvatarProps) => {
  const [isImageLoading, setIsImageLoading] = useState(!!imageUrl)
  const completeName = getUserName(firstname, lastname)

  const displayFallback = () => {
    if (completeName && !isEmpty(completeName))
      return (
        <AvatarFallbackText>
          {getInitials(firstname, lastname)}
        </AvatarFallbackText>
      )

    return <Icon name={fallBackIcon || 'FAS-user'} color="white" size="lg" />
  }

  return (
    <VStack alignItems="center" gap="$3">
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <Skeleton radius="round" show={isLoading || isImageLoading}>
          <GAvatar size="2xl" {...props}>
            {imageUrl ? (
              <AvatarImage
                alt="avatar"
                source={{ uri: imageUrl }}
                onLoad={() => setIsImageLoading(false)}
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
        </Skeleton>
      </TouchableOpacity>

      {!isNilOrEmpty(completeName) && (
        <Heading size="xs">{completeName}</Heading>
      )}
    </VStack>
  )
}

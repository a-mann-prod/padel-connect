import {
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Center,
  Avatar as GAvatar,
  Heading,
  VStack,
} from '@gluestack-ui/themed'
import { useRef, useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { isEmpty } from 'remeda'

import { Icon, IconNameProp } from '../Icon/Icon'
import { ImageViewer } from '../ImageViewer/ImageViewer'
import { ImageWrapper } from '../ImageViewer/ImageWrapper'
import { Skeleton } from '../Skeleton/Skeleton'

import { isNilOrEmpty } from '@/utils/global'
import { getInitials, getUsername } from '@/utils/user'

export type AvatarProps = {
  imageUrl?: string
  firstname?: string | null
  lastname?: string | null
  status?: 'online' | 'offline' | 'hidden'
  onPress?: TouchableOpacityProps['onPress']
  isLoading?: boolean
  fallBackIcon?: IconNameProp
  containerProps?: typeof VStack.defaultProps
  displayBadge?: boolean
  viewerEnabled?: boolean
} & typeof GAvatar.defaultProps

export const Avatar = ({
  imageUrl,
  status = 'hidden',
  onPress,
  firstname,
  lastname,
  isLoading,
  fallBackIcon,
  containerProps,
  displayBadge,
  viewerEnabled,
  ...props
}: AvatarProps) => {
  const imageViewerRef = useRef<any>(null)

  const [isImageLoading, setIsImageLoading] = useState(!!imageUrl)
  const completeName = getUsername(firstname, lastname)

  const displayFallback = () => {
    if (completeName && !isEmpty(completeName))
      return (
        <AvatarFallbackText>
          {getInitials(firstname, lastname)}
        </AvatarFallbackText>
      )

    return (
      <Icon name={fallBackIcon || 'FAS-user'} color="white" size={props.size} />
    )
  }

  return (
    <>
      <ImageViewer
        ref={imageViewerRef}
        data={[{ key: 'avatar', source: { uri: imageUrl } }]}
      />
      <VStack alignItems="center" gap="$3" {...containerProps}>
        <TouchableOpacity onPress={onPress} disabled={!onPress}>
          <Skeleton radius="round" show={isLoading || isImageLoading}>
            <ImageWrapper
              index={0}
              uri={imageUrl}
              viewerRef={imageViewerRef}
              enabled={!onPress && viewerEnabled}
            >
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
                {onPress && displayBadge && (
                  <AvatarBadge bgColor="$blueGray500">
                    <Center flex={1}>
                      <Icon name="FAS-pen" color="$white" size="xs" />
                    </Center>
                  </AvatarBadge>
                )}
              </GAvatar>
            </ImageWrapper>
          </Skeleton>
        </TouchableOpacity>

        {!isNilOrEmpty(completeName) && (
          <Heading size="xs">{completeName}</Heading>
        )}
      </VStack>
    </>
  )
}

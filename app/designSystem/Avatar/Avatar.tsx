import {
  AvatarFallbackText,
  AvatarImage,
  Avatar as GAvatar,
  Heading,
  VStack,
  useToken,
} from '@gluestack-ui/themed'
import { ComponentProps, useRef, useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { AvatarBadge, AvatarBadgeProps } from '../AvatarBadge/AvatarBadge'
import { Icon, IconNameProp } from '../Icon/Icon'
import { ImageViewer } from '../ImageViewer/ImageViewer'
import { ImageWrapper } from '../ImageViewer/ImageWrapper'
import { Skeleton } from '../Skeleton/Skeleton'

import { ColorsToken } from '@/services/theme/gluestack-ui/gluestack-ui.config'
import { isNilOrEmpty } from '@/utils/global'
import { getInitials } from '@/utils/user'

export type GAvatarProps = ComponentProps<typeof GAvatar>

export type AvatarProps = {
  imageUrl?: string
  firstname?: string | null
  lastname?: string | null
  fullName?: string | null
  status?: 'online' | 'offline' | 'hidden'
  onPress?: TouchableOpacityProps['onPress']
  isLoading?: boolean
  fallBackIcon?: IconNameProp
  containerProps?: typeof VStack.defaultProps
  badgeType?: AvatarBadgeProps['type']
  viewerEnabled?: boolean
  border?: Partial<{
    color: ColorsToken
  }>
} & GAvatarProps

export const Avatar = ({
  imageUrl,
  status = 'hidden',
  onPress,
  firstname,
  lastname,
  fullName,
  isLoading,
  fallBackIcon,
  containerProps,
  badgeType,
  viewerEnabled,
  border,
  ...props
}: AvatarProps) => {
  const borderColor = useToken('colors', border?.color || 'black')
  const borderWidth = useToken('borderWidths', '4')

  const imageViewerRef = useRef<any>(null)

  const [isImageLoading, setIsImageLoading] = useState(!!imageUrl)

  const displayFallback = () => {
    if (firstname && lastname && !fallBackIcon)
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
        <TouchableOpacity
          onPress={onPress}
          disabled={!onPress}
          style={{
            borderRadius: 50,
            borderColor: border?.color ? borderColor : undefined,
            borderWidth: border?.color ? borderWidth : undefined,
          }}
        >
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
                {badgeType && <AvatarBadge type={badgeType} />}
              </GAvatar>
            </ImageWrapper>
          </Skeleton>
        </TouchableOpacity>

        {!isNilOrEmpty(fullName) && <Heading size="xs">{fullName}</Heading>}
      </VStack>
    </>
  )
}

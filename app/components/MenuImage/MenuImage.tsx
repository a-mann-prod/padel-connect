import { Box, Image, VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

type MenuImageProps = PropsWithChildren & {
  image: string
}

export const MenuImage = ({ children, image }: MenuImageProps) => {
  return (
    <Box flex={1}>
      <Image
        h="40%"
        w="$full"
        alt="home_header_background"
        source={image}
        resizeMode="cover"
      />
      <Box
        flex={1}
        mt={-30}
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        variant="backgroundColored"
      >
        <VStack gap="$3" m="$3" mt="$3">
          {children}
        </VStack>
      </Box>
    </Box>
  )
}

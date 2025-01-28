import { Heading, Text, VStack } from '@gluestack-ui/themed'
import { ComponentProps, PropsWithChildren } from 'react'

import { isNilOrEmpty } from '@/utils/global'

type VStackProps = ComponentProps<typeof VStack>

export type SectionProps = {
  title?: string
  subtitle?: string | null
} & VStackProps

export const Section = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<SectionProps>) => (
  <VStack
    p="$3"
    gap="$1"
    dark-bgColor="$backgroundDark50"
    variant="colored"
    rounded="$lg"
  >
    {!isNilOrEmpty(title) && <Heading>{title}</Heading>}
    {!isNilOrEmpty(subtitle) && <Text fontSize="$xs">{subtitle}</Text>}
    <VStack>{children}</VStack>
  </VStack>
)

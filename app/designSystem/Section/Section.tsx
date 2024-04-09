import { Heading, Text, VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

import { isNilOrEmpty } from '@/utils/global'

export type SectionProps = {
  title?: string
  subtitle?: string | null
}
export const Section = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<SectionProps>) => (
  <VStack
    p="$3"
    gap="$1"
    dark-bgColor="$backgroundDark50"
    bgColor="$light50"
    rounded="$lg"
  >
    {!isNilOrEmpty(title) && <Heading>{title}</Heading>}
    {!isNilOrEmpty(subtitle) && <Text fontSize="$xs">{subtitle}</Text>}
    <VStack>{children}</VStack>
  </VStack>
)

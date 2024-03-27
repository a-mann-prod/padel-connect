import { isNilOrEmpty } from '@/utils/global'
import { Heading, Text, VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

export type SettingsSectionProps = {
  title?: string
  subtitle?: string | null
}
export const SettingsSection = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<SettingsSectionProps>) => (
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

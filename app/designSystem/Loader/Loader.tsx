import { Center, Spinner, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

export type LoaderProps = ComponentProps<typeof Center> & {
  title?: string
}

export const Loader = ({ title, ...props }: LoaderProps) => (
  <Center flex={1} {...props} gap="$3">
    {title && <Text textAlign="center">{title}</Text>}
    <Spinner />
  </Center>
)

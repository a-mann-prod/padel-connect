import { Center, Heading, Spinner } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

export type LoaderProps = ComponentProps<typeof Center> & {
  title?: string
}

export const Loader = ({ title, ...props }: LoaderProps) => (
  <Center flex={1} {...props}>
    {title && <Heading textAlign="center">{title}</Heading>}
    <Spinner />
  </Center>
)

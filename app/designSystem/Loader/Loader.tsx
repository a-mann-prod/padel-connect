import { Center, Spinner } from '@gluestack-ui/themed'

export type LoaderProps = typeof Center.defaultProps

export const Loader = (props: LoaderProps) => (
  <Center flex={1} {...props}>
    <Spinner />
  </Center>
)

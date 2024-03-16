import { Text } from '@gluestack-ui/themed'
import { Trans, TransProps } from 'react-i18next'

// TODO: replace by variants ?
const components = {
  strong: <Text fontWeight="bold" color="$primary500" />,
  italic: <Text fontStyle="italic" />,
}

export type TranslateTextProps = Pick<
  TransProps<any>,
  'i18nKey' | 't' | 'values'
>

export const TranslateText = (props: TranslateTextProps) => (
  <Text>
    <Trans components={components} {...props} />
  </Text>
)

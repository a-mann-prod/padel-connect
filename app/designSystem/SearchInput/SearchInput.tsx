import { Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed'

import { FontAwesome } from '../Icon/FontAwesome/FontAwesome'

import { useTranslate } from '@/services/i18n'

export type SearchInputProps = typeof InputField.defaultProps

export const SearchInput = (props: SearchInputProps) => {
  const t = useTranslate()
  return (
    <Input>
      <InputSlot pl="$3">
        <InputIcon
          w={null}
          h={null}
          as={(iconProps: any) => (
            <FontAwesome {...iconProps} name="FAS-magnifying-glass" />
          )}
        />
      </InputSlot>
      <InputField placeholder={t('search')} autoCorrect={false} {...props} />
    </Input>
  )
}

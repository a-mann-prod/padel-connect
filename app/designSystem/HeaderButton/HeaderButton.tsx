import { HeaderButtonContainer } from '../HeaderButtonContainer/HeaderButtonContainer'
import { IconButton, IconButtonProps } from '../IconButton/IconButton'

export type HeaderButtonProps = IconButtonProps

export const HeaderButton = (props: HeaderButtonProps) => (
  <HeaderButtonContainer>
    <IconButton variant="header" iconProps={{ size: 'md' }} {...props} />
  </HeaderButtonContainer>
)

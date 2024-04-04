import { IconProps } from '@expo/vector-icons/build/createIconSet'

import FontAwesomeRegular, {
  FontAwesomeRegularIcons,
  FontAwesomeRegularProps,
} from './FontAwesomeRegular'
import FontAwesomeSolid, {
  FontAwesomeSolidIcons,
  FontAwesomeSolidProps,
} from './FontAwesomeSolid'

export type FontAwesome6Icons = FontAwesomeSolidIcons | FontAwesomeRegularIcons
export type FontAwesomeProps = IconProps<FontAwesome6Icons>

export const FontAwesome = (props: FontAwesomeProps) => {
  if (isRegular(props)) return <FontAwesomeRegular {...props} />

  if (isSolid(props)) return <FontAwesomeSolid {...props} />
}

const isRegular = (props: FontAwesomeProps): props is FontAwesomeRegularProps =>
  props.name.startsWith('FAR')

const isSolid = (props: FontAwesomeProps): props is FontAwesomeSolidProps =>
  props.name.startsWith('FAS')

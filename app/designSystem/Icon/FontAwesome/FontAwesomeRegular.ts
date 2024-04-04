import { createIconSet } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

import glyphMap from '../../../assets/fonts/FontAwesome6-regular-glyphMap.json'

export type FontAwesomeRegularIcons = keyof typeof glyphMap
export type FontAwesomeRegularProps = IconProps<FontAwesomeRegularIcons>

export default createIconSet(
  glyphMap,
  'FontAwesome6Regular',
  'FontAwesome6-regular.ttf'
)

import { createIconSet } from '@expo/vector-icons'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

import glyphMap from '../../../assets/fonts/FontAwesome6-solid-glyphMap.json'

export type FontAwesomeSolidIcons = keyof typeof glyphMap
export type FontAwesomeSolidProps = IconProps<FontAwesomeSolidIcons>

export default createIconSet(
  glyphMap,
  'FontAwesome6Solid',
  'FontAwesome6-solid.ttf'
)

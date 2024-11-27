import { Icon, IconProps } from '@/designSystem'

type MatchTypeIconProps = {
  isCompetitive: boolean
} & IconProps

export const MatchTypeIcon = ({
  isCompetitive,
  ...props
}: MatchTypeIconProps) => {
  return (
    <Icon name={isCompetitive ? 'FAS-trophy' : 'FAR-hand-peace'} {...props} />
  )
}

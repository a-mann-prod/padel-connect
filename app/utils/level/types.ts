import { ChoiceType } from '@/hooks/useLevelEstimationSteps'
import { UpdateProfileParams } from '@/services/api'

export type LevelInput = {
  value: number
  type: ChoiceType
}

export type Level = Pick<
  UpdateProfileParams,
  'defense_level' | 'service_level' | 'offense_level'
>

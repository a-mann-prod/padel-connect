import { ChoiceType } from '@/hooks/useLevelEstimationSteps'
import { UpdateMeProfileParams } from '@/services/api'

export type LevelInput = {
  value: number
  type: ChoiceType
}

export type Level = Pick<
  UpdateMeProfileParams,
  'defense_level' | 'service_level' | 'offense_level'
>

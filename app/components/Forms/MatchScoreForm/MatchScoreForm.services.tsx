import { z } from 'zod'

import { ScoreData } from '@/services/api/types'
import { validators } from '@/services/formValidator'
import { Nillable } from '@/types'

const toNumberOrNull = (value: string | null | undefined) =>
  !value !== null && value !== undefined && value !== '' ? Number(value) : null

export type MatchScoreFormValues = z.infer<typeof schema>

const getDefaultValues = (
  props?: Nillable<MatchScoreFormValues>
): MatchScoreFormValues => ({
  set_1_team_1: props?.set_1_team_1 || '',
  set_2_team_1: props?.set_2_team_1 || '',
  set_3_team_1: props?.set_3_team_1 || '',
  set_1_team_2: props?.set_1_team_2 || '',
  set_2_team_2: props?.set_2_team_2 || '',
  set_3_team_2: props?.set_3_team_2 || '',

  tie_break_1_team_1: props?.tie_break_1_team_1 || '',
  tie_break_2_team_1: props?.tie_break_2_team_1 || '',
  tie_break_3_team_1: props?.tie_break_3_team_1 || '',
  tie_break_1_team_2: props?.tie_break_1_team_2 || '',
  tie_break_2_team_2: props?.tie_break_2_team_2 || '',
  tie_break_3_team_2: props?.tie_break_3_team_2 || '',
})

const schema = z.object({
  set_1_team_1: validators.string.optional(),
  set_2_team_1: validators.string.optional(),
  set_3_team_1: validators.string.optional(),
  set_1_team_2: validators.string.optional(),
  set_2_team_2: validators.string.optional(),
  set_3_team_2: validators.string.optional(),

  tie_break_1_team_1: validators.string.optional(),
  tie_break_2_team_1: validators.string.optional(),
  tie_break_3_team_1: validators.string.optional(),
  tie_break_1_team_2: validators.string.optional(),
  tie_break_2_team_2: validators.string.optional(),
  tie_break_3_team_2: validators.string.optional(),
})

const formatToParams = (props: MatchScoreFormValues): ScoreData => ({
  sets: {
    team_1: [
      toNumberOrNull(props.set_1_team_1),
      toNumberOrNull(props.set_2_team_1),
      toNumberOrNull(props.set_3_team_1),
    ],
    team_2: [
      toNumberOrNull(props.set_1_team_2),
      toNumberOrNull(props.set_2_team_2),
      toNumberOrNull(props.set_3_team_2),
    ],
  },
  tie_breaks: {
    team_1: [
      toNumberOrNull(props.tie_break_1_team_1),
      toNumberOrNull(props.tie_break_2_team_1),
      toNumberOrNull(props.tie_break_3_team_1),
    ],
    team_2: [
      toNumberOrNull(props.tie_break_1_team_2),
      toNumberOrNull(props.tie_break_2_team_2),
      toNumberOrNull(props.tie_break_3_team_2),
    ],
  },
})

const formatToFormValues = (props: ScoreData): MatchScoreFormValues => ({
  set_1_team_1: props.sets.team_1?.[0]?.toString(),
  set_2_team_1: props.sets.team_1?.[1]?.toString(),
  set_3_team_1: props.sets.team_1?.[2]?.toString(),
  set_1_team_2: props.sets.team_2?.[0]?.toString(),
  set_2_team_2: props.sets.team_2?.[1]?.toString(),
  set_3_team_2: props.sets.team_2?.[2]?.toString(),

  tie_break_1_team_1: props.tie_breaks.team_1?.[0]?.toString(),
  tie_break_2_team_1: props.tie_breaks.team_1?.[1]?.toString(),
  tie_break_3_team_1: props.tie_breaks.team_1?.[2]?.toString(),
  tie_break_1_team_2: props.tie_breaks.team_2?.[0]?.toString(),
  tie_break_2_team_2: props.tie_breaks.team_2?.[1]?.toString(),
  tie_break_3_team_2: props.tie_breaks.team_2?.[2]?.toString(),
})

export const matchScoreFormServices = {
  getDefaultValues,
  schema,
  formatToParams,
  formatToFormValues,
}

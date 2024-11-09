import { Nillable } from '@/types'
import { FileInput } from '@/utils/file'
import { MeProfileResponse } from './entities'

export type UpdateMeProfileParams = Nillable<MeProfileResponse>

export type UpdateMeAvatarParams = FileInput

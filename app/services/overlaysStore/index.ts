import { omit } from 'remeda'
import { create } from 'zustand'

import {
  DefaultAlertContentProps,
  SelfDeleteContentAlertProps,
} from '@/components'

export type OverlaysStored = Partial<{
  selfDeleteAlert: SelfDeleteContentAlertProps
  defaultAlert: DefaultAlertContentProps
}>

type OverlayProps<T> = Omit<T, 'hide'>

export type OverlayStore = {
  overlays: OverlaysStored
  show: <
    OverlayId extends keyof OverlaysStored,
    Props extends OverlayProps<OverlaysStored[OverlayId]>,
  >(
    id: OverlayId,
    props?: Props
  ) => void
  hide: (id: keyof OverlaysStored) => void
  hideAll: () => void
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  overlays: {},
  show: <
    OverlayId extends keyof OverlaysStored,
    Props extends OverlayProps<OverlaysStored[OverlayId]>,
  >(
    overlayId: OverlayId,
    props?: Props
  ) =>
    set((prev) => ({
      overlays: { ...prev.overlays, [overlayId]: props || null },
    })),
  hide: (overlayId: keyof OverlaysStored) =>
    set((prev) => ({ overlays: omit(prev.overlays, [overlayId]) })),
  hideAll: () => set(() => ({ overlays: {} })),
}))

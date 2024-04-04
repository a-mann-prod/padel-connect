import { AlertProps } from '@/designSystem'
import { omit } from 'remeda'
import { create } from 'zustand'

export type OverlaysStored = Partial<{
  alert: AlertProps
}>

export type OverlayStore = {
  overlays: OverlaysStored
  show: <
    OverlayId extends keyof OverlaysStored,
    Props extends OverlaysStored[OverlayId],
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
    Props extends OverlaysStored[OverlayId],
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

import { ReactElement } from 'react'
import { keys } from 'remeda'

import { OverlaysStored, useOverlayStore } from '@/services/overlaysStore'

export type OverlayWrapperChildrenProps = {
  hide: () => void
  isOpen: boolean
}

export type OverlayWrapperProps<T extends keyof OverlaysStored> = {
  overlayId: T
  children: (_: OverlayWrapperChildrenProps & OverlaysStored[T]) => ReactElement
}

export const OverlayWrapper = <T extends keyof OverlaysStored>({
  overlayId,
  children,
}: OverlayWrapperProps<T>) => {
  const { overlays, hide } = useOverlayStore()

  const currentOverlayProps = overlays[overlayId]

  const isOpen = keys(overlays).some((id) => id === overlayId)

  const props = {
    isOpen,
    hide: () => hide(overlayId),
    ...currentOverlayProps,
  }

  return <>{children(props)}</>
}

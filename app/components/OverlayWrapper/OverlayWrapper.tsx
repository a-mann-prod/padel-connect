import { ReactElement } from 'react'

import { OverlaysStored, useOverlayStore } from '@/app/store'

export type OverlayWrapperProps<T extends keyof OverlaysStored> = {
  overlayId: T
  children: (_: {
    props: OverlaysStored[T]
    hide: () => void
    isOpen: boolean
  }) => ReactElement
}

export const OverlayWrapper = <T extends keyof OverlaysStored>({
  overlayId,
  children,
}: OverlayWrapperProps<T>) => {
  const { overlays, hide } = useOverlayStore()

  const currentOverlayProps = overlays[overlayId]

  const props = {
    isOpen: !!currentOverlayProps,
    hide: () => hide(overlayId),
    props: currentOverlayProps,
  }

  return <>{children(props)}</>
}

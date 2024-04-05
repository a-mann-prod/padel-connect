import { SelfDeleteContent } from './SelfDeleteContent'

import { OverlayWrapper } from '@/components/OverlayWrapper/OverlayWrapper'

export const SelfDeleteAlert = () => (
  <OverlayWrapper overlayId="selfDeleteAlert">
    {(props) => <SelfDeleteContent {...props} />}
  </OverlayWrapper>
)

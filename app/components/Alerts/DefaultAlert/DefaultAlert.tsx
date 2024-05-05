import { DefaultAlertContent } from './DefaultAlertContent'

import { OverlayWrapper } from '@/components/OverlayWrapper/OverlayWrapper'

export const DefaultAlert = () => (
  <OverlayWrapper overlayId="defaultAlert">
    {(props) => <DefaultAlertContent {...props} />}
  </OverlayWrapper>
)

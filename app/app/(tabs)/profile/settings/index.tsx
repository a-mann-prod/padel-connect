import { WithAuth } from '@/components'
import { MainSettings } from '@/nodes'

export default WithAuth(() => {
  return <MainSettings />
})

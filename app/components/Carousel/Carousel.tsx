import { Box } from '@gluestack-ui/themed'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import PagerView from 'react-native-pager-view'

import { CarouselStep, CarouselStepProps } from './CarouselStep'

import { Dots } from '@/designSystem'

type OnboardingProps = {
  steps: CarouselStepProps[]
}

export const Carousel = forwardRef(({ steps }: OnboardingProps, ref: any) => {
  const localRef = useRef<any>(null)

  const [pageIndex, setPageIndex] = useState(0)

  const isBeforeLastIndex = pageIndex >= steps.length - 2

  useImperativeHandle(ref, () => ({
    ...localRef.current,
    incrementPage: () => {
      localRef.current?.setPage(pageIndex)
    },
    getCurrentIndex: () => pageIndex,
    getIsBeforeLastIndex: () => isBeforeLastIndex,
  }))

  return (
    <Box flex={1} p="$3" gap="$3">
      <PagerView
        ref={localRef}
        scrollEnabled={false}
        useNext
        style={{ flex: 1 }}
        onPageSelected={({ nativeEvent: { position } }) =>
          setPageIndex(position)
        }
      >
        {steps.map((step, index) => (
          <CarouselStep key={index} {...step} />
        ))}
      </PagerView>

      <Dots index={pageIndex} total={steps.length} />
    </Box>
  )
})

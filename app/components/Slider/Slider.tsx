import { Box, HStack, VStack } from '@gluestack-ui/themed'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import PagerView from 'react-native-pager-view'

import { SliderStep, SliderStepProps } from './SliderStep'

import { Button, Dots } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

type OnboardingProps = {
  steps: SliderStepProps[]
  onPress: () => void
}

export const Slider = forwardRef(
  ({ steps, onPress }: OnboardingProps, ref: any) => {
    const localRef = useRef<any>(null)

    const tGlobal = useTranslate()
    const [pageIndex, setPageIndex] = useState(0)

    const isLastIndex = pageIndex >= steps.length - 1

    useImperativeHandle(ref, () => ({
      ...localRef.current,
      getCurrentIndex: () => pageIndex,
      getIsLastIndex: () => isLastIndex,
    }))

    return (
      <Box flex={1} gap="$3">
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
            <SliderStep key={index} {...step} />
          ))}
        </PagerView>

        <VStack gap="$3">
          <Dots index={pageIndex} total={steps.length} />
          <HStack px="$3" justifyContent="space-between">
            <Button
              title={tGlobal('previous')}
              variant="outline"
              isDisabled={pageIndex < 1}
              onPress={() => ref.current?.setPage(pageIndex - 1)}
            />
            {/* {isLastIndex && (
              <Button title={tGlobal('save')} onPress={onPress} />
            )} */}
          </HStack>
        </VStack>
      </Box>
    )
  }
)

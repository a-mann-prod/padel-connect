import { SafeAreaView } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'

import { Slider } from '@/components'
import { useOnboardingContext } from '@/contexts'
import { useLevelEstimationSteps } from '@/hooks/useLevelEstimationSteps'
import { routing } from '@/services/routing'
import { modifyArray } from '@/utils/array'
import { LevelInput, calculLevel } from '@/utils/levelEstimation'

export default () => {
  const { setLevel } = useOnboardingContext()
  const sliderRef = useRef<any>(null)
  const [levelInput, setLevelInput] = useState<LevelInput[]>([])

  const steps = useLevelEstimationSteps((value, type) => {
    const currentIndex = sliderRef.current?.getCurrentIndex()
    sliderRef.current?.setPage(currentIndex + 1)
    setLevelInput((prev) => [
      ...modifyArray(prev, currentIndex, { value, type }),
    ])
  })

  useEffect(() => {
    if (sliderRef.current?.getIsLastIndex()) {
      const level = calculLevel(levelInput)
      setLevel(level)
      router.navigate(routing.onboardingGetStarted.path())
    }
  }, [levelInput, setLevel])

  return (
    <SafeAreaView flex={1}>
      <Slider
        ref={sliderRef}
        steps={steps}
        onPress={() => console.log('test')}
      />
    </SafeAreaView>
  )
}

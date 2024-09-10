import {
  Center,
  Heading,
  SafeAreaView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useEffect, useRef, useState } from 'react'

import { Carousel } from '@/components'
import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useLevelEstimationSteps } from '@/hooks/useLevelEstimationSteps'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { modifyArray } from '@/utils/array'
import { LevelInput, calculLevel, getLevel } from '@/utils/level'

export default () => {
  const tGlobal = useTranslate()
  const { level, setLevel } = useOnboardingContext()
  const carouselRef = useRef<any>(null)
  const [levelInput, setLevelInput] = useState<LevelInput[]>([])

  const steps = useLevelEstimationSteps((value, type) => {
    const currentIndex = carouselRef.current?.getCurrentIndex()
    carouselRef.current?.incrementPage()
    setLevelInput((prev) => [
      ...modifyArray(prev, currentIndex, { value, type }),
    ])
  })

  useEffect(() => {
    if (carouselRef.current?.getIsBeforeLastIndex()) {
      const level = calculLevel(levelInput)
      setLevel(level)
    }
  }, [levelInput, setLevel])

  return (
    <SafeAreaView flex={1} variant="colored">
      <Carousel
        ref={carouselRef}
        steps={[
          ...steps,
          {
            content: (
              <VStack flex={1} gap="$3">
                <Center flex={1} gap="$2">
                  <Text>{tGlobal('levelRevelation')}</Text>
                  <Heading>{level ? getLevel(level) : undefined}</Heading>
                </Center>
                <Text variant="subtitle">{tGlobal('canReevaluateLevel')}</Text>
              </VStack>
            ),
          },
        ]}
      />
      <VStack p="$3">
        <Button
          isDisabled={!level}
          title={tGlobal('next')}
          onPress={() =>
            router.navigate(routing.onboardingNotificationAlerts.path())
          }
        />
      </VStack>
    </SafeAreaView>
  )
}

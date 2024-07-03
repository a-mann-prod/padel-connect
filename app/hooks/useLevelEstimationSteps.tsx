import { CarouselStepProps } from '@/components/Carousel/CarouselStep'
import { LevelEstimationForm } from '@/components/Forms/LevelEstimationForm/LevelEstimationForm'
import { ScrollView } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { iterate } from '@/utils/array'

export type ChoiceType = 'offense' | 'defense' | 'service'

const useCreateChoices = () => {
  const t = useTranslate('onboarding', { keyPrefix: 'levelEstimation' })
  return (questionNb: number, nb: number) =>
    iterate(nb).map((n) => ({
      label: t(`question${questionNb}.choice${n}`),
      value: n + 1,
    }))
}

type Question = Omit<CarouselStepProps, 'containerProps' | 'content'> & {
  type: ChoiceType
  choices: { label: string; value: number }[]
}

export const useLevelEstimationSteps = (
  onSubmit: (value: number, type: ChoiceType) => void
): CarouselStepProps[] => {
  const t = useTranslate('onboarding', { keyPrefix: 'levelEstimation' })
  const createChoices = useCreateChoices()

  const questions: Question[] = [
    {
      title: t('question0.title'),
      type: 'service',
      choices: createChoices(0, 7),
    },
    {
      title: t('question1.title'),
      type: 'defense',
      subtitle: t('question1.subtitle'),
      choices: createChoices(1, 7),
    },
    {
      title: t('question2.title'),
      type: 'defense',
      subtitle: t('question2.subtitle'),
      choices: createChoices(2, 7),
    },
    {
      title: t('question3.title'),
      type: 'defense',
      subtitle: t('question3.subtitle'),
      choices: createChoices(3, 7),
    },
    {
      title: t('question4.title'),
      type: 'offense',
      subtitle: t('question4.subtitle'),
      choices: createChoices(4, 7),
    },
    {
      title: t('question5.title'),
      type: 'offense',
      subtitle: t('question5.subtitle'),
      choices: createChoices(5, 7),
    },
  ]

  return [
    ...questions.map(({ choices, type, ...question }) => ({
      ...question,
      content: (
        <ScrollView>
          <LevelEstimationForm
            onSubmit={(v) => onSubmit(Number(v.level), type)}
            options={choices.map(({ label, value }) => ({
              label,
              value: value.toString(),
            }))}
          />
        </ScrollView>
      ),
    })),
  ]
}

import { LevelEstimationForm } from '@/components/Forms/LevelEstimationForm/LevelEstimationForm'
import { SliderStepProps } from '@/components/Slider/SliderStep'
import { useTranslate } from '@/services/i18n'

export type ChoiceType = 'offense' | 'defense' | 'service'

type Question = Omit<SliderStepProps, 'containerProps' | 'content'> & {
  type: ChoiceType
  choices: { label: string; value: number }[]
}

export const useLevelEstimationSteps = (
  onSubmit: (value: number, type: ChoiceType) => void
) => {
  const t = useTranslate('onboarding', { keyPrefix: 'levelEstimation' })

  const questions: Question[] = [
    {
      title: t('question0.title'),
      type: 'service',
      choices: [
        { label: t('question0.choice0'), value: 0 },
        { label: t('question0.choice1'), value: 5 },
        { label: t('question0.choice2'), value: 10 },
      ],
    },
    {
      title: t('question1.title'),
      type: 'defense',
      subtitle: t('question1.subtitle'),
      choices: [
        { label: t('question1.choice0'), value: 0 },
        { label: t('question1.choice1'), value: 5 },
        { label: t('question1.choice2'), value: 10 },
      ],
    },
    {
      title: t('question2.title'),
      type: 'defense',
      subtitle: t('question2.subtitle'),
      choices: [
        { label: t('question2.choice0'), value: 0 },
        { label: t('question2.choice1'), value: 5 },
        { label: t('question2.choice2'), value: 10 },
      ],
    },
    {
      title: t('question3.title'),
      type: 'offense',
      subtitle: t('question3.subtitle'),
      choices: [
        { label: t('question3.choice0'), value: 0 },
        { label: t('question3.choice1'), value: 5 },
        { label: t('question3.choice2'), value: 10 },
      ],
    },
  ]

  return questions.map(({ choices, type, ...question }) => ({
    ...question,
    content: (
      <LevelEstimationForm
        onSubmit={(v) => onSubmit(Number(v.level), type)}
        options={choices.map(({ label, value }) => ({
          label,
          value: value.toString(),
        }))}
      />
    ),
  }))
}

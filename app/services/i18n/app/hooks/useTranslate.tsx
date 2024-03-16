import { UseTranslationOptions, useTranslation } from 'react-i18next'

import { Namespace } from '../resources'

export const useTranslate = (
  ns?: Exclude<Namespace, 'global'>,
  options?: UseTranslationOptions<string>
) => {
  const { t } = useTranslation(ns ? ns : 'global', options)
  return t
}

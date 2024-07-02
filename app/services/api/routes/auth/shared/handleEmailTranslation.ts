import { i18n } from '@/services/i18n'
import { authEmailsTranslations } from '@/services/i18n/supabase/authEmailsTranslations'

export const handleEmailTranslation = () => {
  const language = i18n().language

  return authEmailsTranslations[language]
}

import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { VStack } from '@gluestack-ui/themed'

// pour supprimer son compte, l'utilisateur doit taper son mot de passe valide (à faire via procédure stockée)
// ensuite on le signout et c'est ciao
export default () => {
  const t = useTranslate('settings')
  return (
    <VStack gap="$3" m="$5">
      <Button
        icon="trash"
        title={t('general.deleteAccount')}
        action="negative"
      />
    </VStack>
  )
}

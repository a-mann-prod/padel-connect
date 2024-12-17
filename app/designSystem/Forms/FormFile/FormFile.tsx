import { Text } from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import { useCallback } from 'react'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { Button } from '@/designSystem/Button/Button'
import { useTranslate } from '@/services/i18n'

export type FileAsset = Omit<ImagePicker.ImagePickerAsset, 'width' | 'height'>

export type FormFileProps = {
  onChange: (value: FileAsset | null) => void
  value: FileAsset | undefined
  formControlProps?: FormControlProps
}

export const FormFile = ({
  formControlProps,
  onChange,
  value,
}: FormFileProps) => {
  const t = useTranslate()

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    })

    if (!result.canceled) {
      onChange(result.assets[0])
    }
  }, [onChange])

  return (
    <FormControl {...formControlProps}>
      <Button title={t('chooseFile')} onPress={() => pickImage()} />
      {value && <Text>{value.fileName}</Text>}
    </FormControl>
  )
}

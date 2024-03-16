import * as ImagePicker from 'expo-image-picker'
import { useMemo, useState } from 'react'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { Actionsheet } from '@/designSystem/Actionsheet/Actionsheet'
import { ActionsheetItemProps } from '@/designSystem/Actionsheet/ActionsheetItem/ActionsheetItem'
import { Avatar } from '@/designSystem/Avatar/Avatar'
import { useTranslate } from '@/services/i18n'

export type FormAvatarProps = {
  formControlProps: FormControlProps
  onChange: (value: ImagePicker.ImagePickerAsset | null) => void
  value: ImagePicker.ImagePickerAsset | undefined
}

export const FormAvatar = ({
  formControlProps,
  onChange,
  value,
}: FormAvatarProps) => {
  const t = useTranslate()
  const [showActionsheet, setShowActionsheet] = useState(false)
  const closeActionsheet = () => setShowActionsheet(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })

    if (!result.canceled) {
      onChange(result.assets[0])
    }
  }

  console.log(value)

  const items = useMemo<ActionsheetItemProps[]>(
    () => [
      {
        title: t('add'),
        isDisabled: !!value,
        icon: 'plus-square',
        onPress: () => {
          pickImage()
          closeActionsheet()
        },
      },
      {
        title: t('edit'),
        isDisabled: !value,
        icon: 'pencil-square',
        onPress: () => {
          pickImage()
          closeActionsheet()
        },
      },
      {
        title: t('delete'),
        isDisabled: !value,
        icon: 'minus-square',
        onPress: () => {
          onChange(null)
          closeActionsheet()
        },
      },
    ],
    [t, value]
  )

  return (
    <>
      <FormControl {...formControlProps}>
        <Avatar
          status="hidden"
          imageUrl={value?.uri}
          onPress={() => setShowActionsheet(true)}
          size="2xl"
        />
      </FormControl>
      <Actionsheet
        isOpen={showActionsheet}
        onClose={closeActionsheet}
        items={items}
      />
    </>
  )
}

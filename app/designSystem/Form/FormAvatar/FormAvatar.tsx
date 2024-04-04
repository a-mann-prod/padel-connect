import * as ImagePicker from 'expo-image-picker'
import { useCallback, useMemo, useState } from 'react'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { Actionsheet } from '@/designSystem/Actionsheet/Actionsheet'
import { ActionsheetItemProps } from '@/designSystem/Actionsheet/ActionsheetItem/ActionsheetItem'
import { Avatar, AvatarProps } from '@/designSystem/Avatar/Avatar'
import { useTranslate } from '@/services/i18n'

export type ImageAsset = Omit<ImagePicker.ImagePickerAsset, 'width' | 'height'>

export type FormAvatarProps = {
  onChange: (value: ImageAsset | null) => void
  value: ImageAsset | undefined
  formControlProps?: FormControlProps
} & Omit<AvatarProps, 'onPress' | 'imageUrl'>

export const FormAvatar = ({
  formControlProps,
  onChange,
  value,
  ...props
}: FormAvatarProps) => {
  const t = useTranslate()
  const [showActionsheet, setShowActionsheet] = useState(false)
  const closeActionsheet = () => setShowActionsheet(false)

  const pickImage = useCallback(async () => {
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
  }, [onChange])

  const items = useMemo<ActionsheetItemProps[]>(
    () => [
      {
        id: 'add',
        title: t('add'),
        isDisabled: !!value,
        icon: 'FAS-square-plus',
        onPress: () => {
          pickImage()
          closeActionsheet()
        },
      },
      {
        id: 'edit',
        title: t('edit'),
        isDisabled: !value,
        icon: 'FAS-square-pen',
        onPress: () => {
          pickImage()
          closeActionsheet()
        },
      },
      {
        id: 'delete',
        title: t('delete'),
        isDisabled: !value,
        icon: 'FAS-square-minus',
        onPress: () => {
          onChange(null)
          closeActionsheet()
        },
      },
    ],
    [onChange, pickImage, t, value]
  )

  return (
    <>
      <FormControl {...formControlProps}>
        <Avatar
          status="hidden"
          imageUrl={value?.uri}
          onPress={() => setShowActionsheet(true)}
          size="2xl"
          {...props}
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

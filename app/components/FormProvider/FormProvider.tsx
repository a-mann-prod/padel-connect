import { VStack } from '@gluestack-ui/themed'
import { ComponentProps, PropsWithChildren } from 'react'
import {
  FieldValues,
  FormProvider as RFormProvider,
  FormProviderProps as RFormProviderProps,
} from 'react-hook-form'
import { Platform } from 'react-native'

export type FormProviderProps<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues,
> = RFormProviderProps<TFieldValues, TContext, TTransformedValues> & {
  containerProps?: ComponentProps<typeof VStack>
}

export const FormProvider = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  children,
  containerProps,
  ...props
}: PropsWithChildren<
  FormProviderProps<TFieldValues, TContext, TTransformedValues>
>) => {
  if (Platform.OS !== 'web')
    return (
      <VStack flex={1} gap="$2" {...containerProps}>
        <RFormProvider {...props}>{children}</RFormProvider>
      </VStack>
    )

  return (
    <form>
      <VStack flex={1} gap="$2" {...containerProps}>
        <RFormProvider {...props}>{children}</RFormProvider>
      </VStack>
    </form>
  )
}

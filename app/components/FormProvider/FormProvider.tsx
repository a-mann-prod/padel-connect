import { VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'
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
> = RFormProviderProps<TFieldValues, TContext, TTransformedValues>

export const FormProvider = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  children,
  ...props
}: PropsWithChildren<
  FormProviderProps<TFieldValues, TContext, TTransformedValues>
>) => {
  if (Platform.OS !== 'web')
    return (
      <VStack gap="$2">
        <RFormProvider {...props}>{children}</RFormProvider>
      </VStack>
    )

  return (
    <form>
      <VStack gap="$2">
        <RFormProvider {...props}>{children}</RFormProvider>
      </VStack>
    </form>
  )
}

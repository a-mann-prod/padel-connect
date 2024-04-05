import { useColorMode } from '@gluestack-style/react'
import { MotiSkeletonProps } from 'moti/build/skeleton/types'
import { Skeleton as MSkeleton } from 'moti/skeleton'
import { PropsWithChildren } from 'react'

export type SkeletonProps = Partial<Omit<MotiSkeletonProps, 'colorMode'>>

export const Skeleton = ({
  children,
  ...props
}: PropsWithChildren<SkeletonProps>) => {
  const colorMode = useColorMode() as 'light' | 'dark'
  return (
    <MSkeleton colorMode={colorMode} {...props}>
      {children}
    </MSkeleton>
  )
}

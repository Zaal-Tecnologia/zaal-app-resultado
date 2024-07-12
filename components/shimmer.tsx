/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ComponentProps } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

import { useTheme } from '~/hooks/use-theme'

import { themes } from '~/styles/themes'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

type Props = ComponentProps<typeof ShimmerPlaceholder>

export function Shimmer(props: Props) {
  const { theme } = useTheme()

  const shimmerColors = themes[theme || 'light'].shimmer

  // @ts-ignore
  return <ShimmerPlaceholder shimmerColors={shimmerColors} {...props} />
}

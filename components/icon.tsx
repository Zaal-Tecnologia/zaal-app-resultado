import { Ionicons } from '@expo/vector-icons'
import { ComponentProps } from 'react'

import { useTheme } from '~/hooks/use-theme'

export type IconProps = Omit<ComponentProps<typeof Ionicons>, 'name'> & {
  name: keyof typeof Ionicons.glyphMap
}

export function Icon(props: IconProps) {
  const { TEXT_PRIMARY } = useTheme()

  return (
    <Ionicons
      {...props}
      name={props.name}
      color={props.color || TEXT_PRIMARY}
    />
  )
}

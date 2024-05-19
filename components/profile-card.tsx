import { twMerge } from 'tailwind-merge'
import {
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { white, zinc } from 'tailwindcss/colors'

import { useTheme } from '~/hooks/use-theme'

import { P } from './p'
import { Icon, IconProps } from './icon'

function Root(props: TouchableOpacityProps) {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={{ backgroundColor: theme === 'dark' ? zinc[800] : zinc[100] }}
      className={twMerge(
        'mb-1 h-16 flex-row items-center px-5',
        props.className,
      )}>
      {props.children}
    </TouchableOpacity>
  )
}

function Svg(props: IconProps) {
  return (
    <View className="h-[32px] w-[32px] items-center justify-center">
      <Icon name={props.name} size={20} />
    </View>
  )
}

function Name(props: TextProps) {
  const { theme } = useTheme()

  return (
    <P
      className="ml-2.5 font-inter-medium text-sm -tracking-wide"
      style={{ color: theme === 'light' ? zinc[800] : white }}>
      {props.children}
    </P>
  )
}

export const ProfileCard = {
  Root,
  Name,
  Svg,
}

import clsx from 'clsx'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white, zinc } from 'tailwindcss/colors'

import { useTheme } from '~/hooks/use-theme'

import { P } from './p'
import { Icon } from './icon'

function Root(props: TouchableOpacityProps & { index: number }) {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={clsx('mb-1 h-16 flex-row items-center justify-between px-5', {
        'rounded-t-2xl': props.index === 0,
      })}
      style={{ backgroundColor: theme === 'dark' ? zinc[800] : zinc[100] }}
      {...props}>
      {props.children}
    </TouchableOpacity>
  )
}

function Status(props: { isActive: boolean; system: string }) {
  return (
    <View className="flex-row items-center">
      {props.isActive ? (
        <View className="mr-1.5 flex-row items-center rounded-full bg-green-500 px-2.5 py-1.5">
          <Ionicons name="checkmark-circle" size={13} color={white} />
          <Text className="ml-1.5 font-inter-semibold text-xs -tracking-wide text-white">
            ATIVO
          </Text>
        </View>
      ) : (
        <>
          <P className="mr-1 font-inter-semibold text-[9px] uppercase -tracking-wide">
            {props.system}
          </P>
          <Icon name="chevron-forward" size={14} />
        </>
      )}
    </View>
  )
}

function Content(props: ViewProps) {
  return <View className="flex-row items-center">{props.children}</View>
}

function Name(props: { name: string }) {
  const { theme } = useTheme()

  return (
    <>
      <View
        className="h-[32px] w-[32px] items-center justify-center rounded-full border"
        style={{
          backgroundColor: theme === 'dark' ? zinc[900] : white,
          borderColor: theme === 'dark' ? zinc[700] : zinc[200],
        }}>
        <P className="font-inter-semibold text-xs uppercase -tracking-wide">
          {props.name.slice(0, 2)}
        </P>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <P className="ml-2.5 font-inter-medium text-sm capitalize -tracking-wide">
          {props.name}
        </P>
      </View>
    </>
  )
}

export const ProfileUserCard = {
  Root,
  Content,
  Status,
  Name,
}

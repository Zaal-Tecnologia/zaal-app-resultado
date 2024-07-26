/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, ReactNode } from 'react'
import { Text, View } from 'react-native'

import { Icon } from './icon'
import { Button } from './button'

import { useTheme } from '~/hooks/use-theme'
import { useSelected } from '~/hooks/use-selected'

import { themes } from '~/styles/themes'
import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'
import { P } from './p'
import { currency } from '~/utils/currency'
import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'

interface SelectedProps {
  children?: ReactNode
}

const Root = (props: SelectedProps) => {
  const { theme } = useTheme()

  return (
    <View style={{ borderTopColor: themes[theme].border, borderTopWidth: 1 }}>
      {props.children}
    </View>
  )
}

export const Selected = memo(Root)

export function SelectedClose() {
  const { setSelected } = useSelected()

  return (
    <Button
      onPress={() => setSelected(null)}
      className="flex-row items-center justify-start px-6 pt-5">
      <Icon name="chevron-back" size={16} color={colors.red[500]} />

      <Text className="mr-2 mt-[1px] font-inter-semibold text-xs text-red-500">
        FECHAR
      </Text>
    </Button>
  )
}

export function SelectedTitle(props: { children: ReactNode }) {
  return (
    <P
      style={{
        margin: 24,
        fontFamily: fonts['urbanist-bold'],
        fontSize: 24,
      }}>
      {props.children}
    </P>
  )
}

export function SelectedPrice(props: { totalValue: number; TOTAL: number }) {
  return (
    <View
      className="mr-1.5 flex-row items-center justify-between rounded-t-[44px] px-10 py-8"
      style={{ backgroundColor: '#ffbb87' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <P className="font-inter-semibold text-xs capitalize leading-5 text-zinc-500">
          VALOR TOTAL {'\n'}DE VENDAS
        </P>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <P className="mr-1.5 font-urbanist-bold text-2xl -tracking-wider">
          {currency(props.totalValue)}
        </P>

        <P
          className="rounded-full px-4 py-2 font-urbanist-bold text-sm text-white"
          style={{ backgroundColor: '#faba80' }}>
          {((props.totalValue / props.TOTAL) * 100).toFixed(2)}%
        </P>
      </View>
    </View>
  )
}

export function SelectedQuantity(props: {
  totalQuantity: number
  TOTAL: number
}) {
  return (
    <View
      className="mr-1.5 flex-row items-center justify-between rounded-b-[44px] px-10 py-8"
      style={{ backgroundColor: '#9B8AFB95' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <P className="font-inter-semibold text-xs capitalize leading-5 text-zinc-500">
          QUANTIDADE TOTAL {'\n'}VENDIDA
        </P>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <P className="mr-1.5 font-urbanist-bold text-2xl -tracking-wider">
          {props.totalQuantity}
        </P>

        <P className="rounded-full px-4 py-2 font-urbanist-bold text-sm text-white">
          {((props.totalQuantity / props.TOTAL) * 100).toFixed(2)}%
        </P>
      </View>
    </View>
  )
}

export function SelectedDetails(props: { href: any }) {
  return (
    <Link asChild href={props.href}>
      <Button className="mt-8 flex-row items-center justify-start rounded-lg px-6">
        <Feather name="arrow-up-right" size={20} color="#305a96" />
        <Text className="font-urbanist-bold text-sm text-[#305a96] underline">
          Ver Mais Detalhes
        </Text>
      </Button>
    </Link>
  )
}

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
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 20,
      }}>
      <Icon name="chevron-back" size={16} color={colors.red[500]} />

      <Text
        style={{
          marginRight: 8,
          marginTop: 1,
          fontFamily: fonts['inter-medium'],
          fontSize: 12,
          color: '#f87171',
        }}>
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
      style={{
        backgroundColor: '#ffbb87',
        marginRight: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 44,
        borderTopRightRadius: 44,
        paddingHorizontal: 40,
        paddingVertical: 32,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <P
          style={{
            fontFamily: fonts['inter-semibold'],
            fontSize: 12,
            textTransform: 'capitalize',
            lineHeight: 20,
            color: '#4B5563',
          }}>
          VALOR TOTAL {'\n'}DE VENDAS
        </P>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <P
          style={{
            marginRight: 6,
            fontFamily: fonts['urbanist-bold'],
            fontSize: 24,
            letterSpacing: -0.5,
          }}>
          {currency(props.totalValue)}
        </P>

        <P
          style={{
            backgroundColor: '#faba80',
            borderRadius: 999,
            paddingHorizontal: 16,
            paddingVertical: 8,
            fontFamily: 'Urbanist-Bold',
            fontSize: 14,
            color: '#FFFFFF',
          }}>
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
      style={{
        backgroundColor: '#9B8AFB95',
        marginRight: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 44,
        borderBottomRightRadius: 44,
        paddingHorizontal: 40,
        paddingVertical: 32,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <P
          style={{
            fontFamily: fonts['inter-semibold'],
            fontSize: 12,
            textTransform: 'capitalize',
            lineHeight: 20,
            color: '#4B5563',
          }}>
          QUANTIDADE TOTAL {'\n'}VENDIDA
        </P>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <P
          style={{
            marginRight: 6,
            fontFamily: fonts['urbanist-bold'],
            fontSize: 24,
            letterSpacing: -0.5,
          }}>
          {props.totalQuantity}
        </P>

        <P
          style={{
            borderRadius: 999, // Para um botão totalmente redondo
            paddingHorizontal: 16,
            paddingVertical: 8,
            fontFamily: fonts['urbanist-bold'],
            fontSize: 14,
            color: '#FFFFFF',
          }}>
          {((props.totalQuantity / props.TOTAL) * 100).toFixed(2)}%
        </P>
      </View>
    </View>
  )
}

export function SelectedDetails(props: { href: any }) {
  return (
    <Link href={props.href}>
      <Button
        style={{
          marginTop: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderRadius: 8,
          paddingHorizontal: 24,
        }}>
        <Feather name="arrow-up-right" size={20} color="#305a96" />
        <Text
          style={{
            fontFamily: fonts['urbanist-bold'],
            fontSize: 14,
            color: '#305a96',
            textDecorationLine: 'underline',
          }}>
          Ver Mais Detalhes
        </Text>
      </Button>
    </Link>
  )
}

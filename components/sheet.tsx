/* eslint-disable react/display-name */
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetProps,
} from '@gorhom/bottom-sheet'
import {
  ComponentProps,
  ElementRef,
  ReactNode,
  forwardRef,
  memo,
  useMemo,
} from 'react'
import {
  Pressable,
  PressableProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native'

import { useVariant } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

import { P } from './p'

import { fonts } from '~/styles/fonts'

const Root = forwardRef<ElementRef<typeof BottomSheet>, BottomSheetProps>(
  (props, ref) => {
    const { BACKGROUND_PRIMARY, BORDER_PRIMARY } = useTheme()

    return (
      <BottomSheet
        ref={ref}
        handleIndicatorStyle={{ height: 4, width: 100, marginVertical: 20 }}
        handleStyle={{ display: 'none' }}
        backgroundStyle={{
          borderRadius: 0,
          borderTopColor: BORDER_PRIMARY,
          backgroundColor: BACKGROUND_PRIMARY,
        }}
        snapPoints={useMemo(() => ['10%', '20%', '30%', '50%', '95%'], [])}
        {...props}>
        {props.children as ReactNode}
      </BottomSheet>
    )
  },
)

export const Sheet = memo(Root)

export function SheetHeader(props: ViewProps) {
  const { variant } = useVariant()

  return (
    <View
      style={{
        backgroundColor: '#305a9620',
        height: 32,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      {...props}>
      <View
        style={{
          height: '100%',
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>Pos.</P>
      </View>

      <View
        style={{
          height: '100%',
          width: '50%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>Nome</P>
      </View>

      <View
        style={{
          height: '100%',
          width: '30%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>
          {variant === 'QNT' ? 'Quant.' : 'Valor'}
        </P>
      </View>
    </View>
  )
}

export function SheetList<T>(
  props: ComponentProps<typeof BottomSheetFlatList<T>>,
) {
  const { BACKGROUND_PRIMARY } = useTheme()

  return (
    <BottomSheetFlatList
      contentContainerStyle={{
        backgroundColor: BACKGROUND_PRIMARY,
      }}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  )
}

export function SheetListRow({ ...props }: PressableProps) {
  const { BORDER_PRIMARY } = useTheme()

  return (
    <Pressable
      style={[
        {
          position: 'relative',
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: BORDER_PRIMARY,
        },
      ]}
      {...props}>
      {props.children}
    </Pressable>
  )
}

type ListColorProps = {
  color: string
}

export function SheetListColor(props: ListColorProps) {
  return (
    <View
      style={{
        backgroundColor: props.color,
        position: 'absolute',
        left: 10,
        height: 20,
        width: 8,
        borderRadius: 999,
      }}
    />
  )
}

export function SheetListItem(props: ViewProps) {
  return (
    <View
      {...props}
      style={[
        {
          height: '100%',
          width: '30%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        props.style,
      ]}>
      {props.children}
    </View>
  )
}

export function SheetListItemTitle(props: TextProps) {
  return (
    <P
      {...props}
      style={[
        {
          fontFamily: fonts['urbanist-bold'],
          fontSize: 13,
          textTransform: 'capitalize',
        },
        props.style,
      ]}>
      {props.children}
    </P>
  )
}

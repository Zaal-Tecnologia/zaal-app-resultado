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
  Text,
  TextProps,
  View,
  ViewProps,
} from 'react-native'
import clsx from 'clsx'

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
          borderTopWidth: 1,
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

function Header(props: ViewProps) {
  const { variant } = useVariant()

  return (
    <View
      className="h-16 w-full flex-row items-center"
      style={{
        backgroundColor: '#305a9620',
      }}
      {...props}>
      <View className="h-full w-[20%] items-center justify-center">
        <P className="font-inter-semibold text-xs">POS.</P>
      </View>

      <View className="h-full w-[50%] items-start justify-center">
        <P className="font-inter-semibold text-xs">NOME</P>
      </View>

      <View className="h-full w-[30%] items-start justify-center">
        <P className="font-inter-semibold text-xs">
          {variant === 'QNT' ? 'QUANTIDADE' : 'VALOR'}
        </P>
      </View>

      {/** <View className="h-full w-[20%] items-start justify-center">
        <P className="font-inter-medium text-xs">QUANTIDADE</P>
      </View> */}
    </View>
  )
}

function List<T>(props: ComponentProps<typeof BottomSheetFlatList<T>>) {
  const { BACKGROUND_PRIMARY } = useTheme()

  return (
    <BottomSheetFlatList
      contentContainerStyle={{
        backgroundColor: BACKGROUND_PRIMARY,
        paddingBottom: 80,
      }}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  )
}

function ListRow(props: PressableProps) {
  return (
    <Pressable
      className="relative h-16 w-full flex-row items-center border-b border-zinc-200 dark:border-b-zinc-800"
      {...props}>
      {props.children}
    </Pressable>
  )
}

type ListColorProps = {
  color: string
}

function ListColor(props: ListColorProps) {
  return (
    <View
      className="absolute left-2.5 h-5 w-2 rounded-full"
      style={{ backgroundColor: props.color }}
    />
  )
}

function ListItem(props: ViewProps) {
  return (
    <View
      className={clsx(
        'h-full w-[30%] items-center justify-center',
        props.className,
      )}
      {...props}>
      {props.children}
    </View>
  )
}

function ListItemTitle(props: TextProps) {
  return (
    <Text
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
    </Text>
  )
}

export const Sheet = {
  Root: memo(Root),
  Header: memo(Header),
  List,
  ListRow: memo(ListRow),
  ListColor: memo(ListColor),
  ListItem: memo(ListItem),
  ListItemTitle: memo(ListItemTitle),
}

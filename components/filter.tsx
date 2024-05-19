import clsx from 'clsx'
import { Pressable, ScrollView, View, ScrollViewProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white } from 'tailwindcss/colors'

import { P } from './p'

import { useFilter } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

export const PERIOD = {
  BRAND: {
    DIA: 'firstOfDayToList',
    MÊS: 'firstOfMonthToList',
    SEMANA: 'firstOfWeekToList',
  },
  BRANCH: {
    DIA: 'firstOfDayDTOList',
    MÊS: 'firstOfMonthDTOList',
    SEMANA: 'firstOfWeekDTOList',
  },
  CATEGORY: {
    DIA: 'firstOfDayToList',
    MÊS: 'firstOfMonthToList',
    SEMANA: 'firstOfWeekToList',
  },
  PRODUCT: {
    DIA: 'firstOfDayDTOList',
    MÊS: 'firstOfMonthDTOList',
    SEMANA: 'firstOfWeekDTOList',
  },
  SALES: {
    DIA: 'diaCorrente',
    MÊS: 'mesCorrente',
    SEMANA: 'semanaCorrente',
  },
} as const

export const VARIANT = {
  VALOR: 'valorTotal',
  QUANTIDADE: 'quantidadeTotal',
} as const

export const CHART = {
  ROSCA: 'ROSCA',
  PIZZA: 'PIZZA',
  'B. VERTICAL': 'B. VERTICAL',
  'B. HORIZONTAL': 'B. HORIZONTAL',
} as const

function Show() {
  const { filter, setFilter } = useFilter()

  return (
    <View className="mr-2 flex-row justify-center rounded-full bg-[#305a96]/10 p-2">
      <Pressable
        className="h-8 w-8 items-center justify-center rounded-full bg-[#305a96]"
        onPress={() => setFilter({ SHOW: !filter.SHOW })}>
        <Ionicons name={!filter.SHOW ? 'eye' : 'eye-off'} color={white} />
      </Pressable>
    </View>
  )
}

function Variant() {
  const { filter, setFilter } = useFilter()
  const { TEXT_PRIMARY } = useTheme()

  return (
    <View className="ml-2 flex-row justify-center rounded-full bg-[#305a96]/10 p-2 dark:bg-[#305a96]/20">
      {(['VALOR', 'QUANTIDADE'] as (keyof typeof VARIANT)[]).map((item) => (
        <Pressable
          key={item}
          className={clsx(
            'h-8 w-14 items-center justify-center rounded-full px-2',
            {
              'bg-[#305a96]': item === filter.VARIANT,
            },
          )}
          onPress={() => setFilter({ VARIANT: item })}>
          <P
            style={{ color: item === filter.VARIANT ? white : TEXT_PRIMARY }}
            className="font-inter-semibold text-xs">
            {item.slice(0, 3)}
          </P>
        </Pressable>
      ))}
    </View>
  )
}

function Chart() {
  const { filter, setFilter } = useFilter()
  const { TEXT_PRIMARY } = useTheme()

  return (
    <View className="ml-2 flex-row justify-center rounded-full bg-[#305a96]/10 p-2 dark:bg-[#305a96]/20">
      {(
        [
          'B. VERTICAL',
          'B. HORIZONTAL',
          'ROSCA',
          'PIZZA',
        ] as (keyof typeof CHART)[]
      ).map((item) => (
        <Pressable
          key={item}
          className={clsx(
            'h-8 w-20 items-center justify-center rounded-full px-2',
            {
              'bg-[#305a96]': item === filter.CHART,
            },
          )}
          onPress={() => setFilter({ CHART: item })}>
          <P
            style={{ color: item === filter.CHART ? white : TEXT_PRIMARY }}
            className="font-inter-semibold text-xs">
            {item.slice(0, 7)}
          </P>
        </Pressable>
      ))}
    </View>
  )
}

function Period() {
  const { filter, setFilter } = useFilter()
  const { TEXT_PRIMARY } = useTheme()

  return (
    <View className="flex-row justify-center rounded-full bg-[#305a96]/10 p-2 dark:bg-[#305a96]/20">
      {(['MÊS', 'SEMANA', 'DIA'] as ['MÊS', 'SEMANA', 'DIA']).map((item) => (
        <Pressable
          key={item}
          className={clsx(
            'h-8 w-14 items-center justify-center rounded-full px-2',
            {
              'bg-[#305a96]': item === filter.PERIOD,
            },
          )}
          onPress={() => setFilter({ PERIOD: item })}>
          <P
            style={{ color: item === filter.PERIOD ? white : TEXT_PRIMARY }}
            className="font-inter-semibold text-xs">
            {item.slice(0, 3)}
          </P>
        </Pressable>
      ))}
    </View>
  )
}

function Root(props: ScrollViewProps) {
  return (
    <ScrollView
      horizontal
      style={{ maxHeight: 40 }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ maxHeight: 40, paddingHorizontal: 20 }}
      {...props}>
      {props.children}
    </ScrollView>
  )
}

export const Filter = {
  Root,
  Period,
  Variant,
  Chart,
  Show,
}

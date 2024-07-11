import clsx from 'clsx'
import {
  Pressable,
  ScrollView,
  View,
  ScrollViewProps,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white } from 'tailwindcss/colors'

import { P } from './p'

import { useChart, usePeriod, useShow, useVariant } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

import { themes } from '~/styles/themes'

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
  VLR: 'valorTotal',
  QNT: 'quantidadeTotal',
} as const

export const CHART = {
  ROSCA: 'ROSCA',
  PIZZA: 'PIZZA',
  'B. VERTICAL': 'B. VERTICAL',
  'B. HORIZONTAL': 'B. HORIZONTAL',
} as const

export function FilterShow() {
  const { setShow, show } = useShow()
  const { theme } = useTheme()

  return (
    <Pressable
      style={[
        {
          borderColor: themes[theme].border,
          backgroundColor: themes[theme].foreground,
        },
        s.singleButtonContainer,
      ]}
      onPress={() => setShow(!show)}>
      <Ionicons name={!show ? 'eye' : 'eye-off'} color="#305a96" size={16} />
    </Pressable>
  )
}

const s = StyleSheet.create({
  singleButtonContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
  },
})

export function FilterVariant() {
  const { setVariant, variant } = useVariant()
  const { TEXT_PRIMARY } = useTheme()

  return (
    <View className="ml-2 flex-row justify-center rounded-full bg-[#305a96]/10 p-2 dark:bg-[#305a96]/20">
      {(['VLR', 'QNT'] as (keyof typeof VARIANT)[]).map((item) => (
        <Pressable
          key={item}
          className={clsx(
            'h-8 w-14 items-center justify-center rounded-full px-2',
            {
              'bg-[#305a96]': item === variant,
            },
          )}
          onPress={() => setVariant(item)}>
          <P
            style={{ color: item === variant ? white : TEXT_PRIMARY }}
            className="font-inter-semibold text-xs">
            {item.slice(0, 3)}
          </P>
        </Pressable>
      ))}
    </View>
  )
}

export function FilterChart() {
  const { setChart, chart } = useChart()
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
              'bg-[#305a96]': item === chart,
            },
          )}
          onPress={() => setChart(item)}>
          <P
            style={{ color: item === chart ? white : TEXT_PRIMARY }}
            className="font-inter-semibold text-xs">
            {item.slice(0, 7)}
          </P>
        </Pressable>
      ))}
    </View>
  )
}

export function FilterPeriod() {
  const { period, setPeriod } = usePeriod()
  const { TEXT_PRIMARY } = useTheme()

  return (
    <View className="flex-row justify-center rounded-full bg-[#305a96]/10 p-2 dark:bg-[#305a96]/20">
      {(['MÊS', 'SEMANA', 'DIA'] as ['MÊS', 'SEMANA', 'DIA']).map((item) => (
        <Pressable
          key={item}
          className={clsx(
            'h-8 w-14 items-center justify-center rounded-full px-2',
            {
              'bg-[#305a96]': item === period,
            },
          )}
          onPress={() => setPeriod(item)}>
          <P
            style={{ color: item === period ? white : TEXT_PRIMARY }}
            className="font-inter-semibold text-xs">
            {item.slice(0, 3)}
          </P>
        </Pressable>
      ))}
    </View>
  )
}

export function Filter(props: ScrollViewProps) {
  return (
    <ScrollView
      horizontal
      style={{ maxHeight: 40, marginVertical: 40 }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ maxHeight: 40, paddingHorizontal: 20 }}
      {...props}>
      {props.children}
    </ScrollView>
  )
}

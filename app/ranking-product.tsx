/** import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { red, white } from 'tailwindcss/colors'
import { Link, Stack } from 'expo-router'

import { api } from '~/api/api'

import {
  Filter,
  FilterChart,
  FilterPeriod,
  FilterVariant,
  PERIOD,
} from '~/components/filter'

import { Chart } from '~/components/chart'
import { Sheet } from '~/components/sheet'
import { P } from '~/components/p'

import { currency } from '~/utils/currency'
import { COLORS } from '~/utils/colors'

import {
  useChart,
  useExpand,
  usePeriod,
  useShow,
  useVariant,
} from '~/hooks/use-filters'
import { useFetch } from '~/hooks/use-fetch'
import { useSelected } from '~/hooks/use-selected'
import { useSheet } from '~/hooks/use-sheet'

import { HEIGHT, WIDTH } from '~/utils/chart-size'

import type { RankingProductDTO } from '~/types/ranking-product-dto'
import { Average } from '~/components/average'
import { CustomSlider } from '~/components/custom-slider'
import { Container } from '~/components/Container'
import { Header } from '~/components/header'
import { useTheme } from '~/hooks/use-theme'
import { SelectedChart } from '~/components/selected-chart'
import { colors } from '~/styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { fonts } from '~/styles/fonts'

let updateTimeout: NodeJS.Timeout

export default function Product() {
  const sheetRef = useSheet()

  const { period } = usePeriod()
  const { selected, setSelected } = useSelected()
  const { chart } = useChart()
  const { show } = useShow()
  const { expand } = useExpand()
  const { variant } = useVariant()

  const { BACKGROUND_SECONDARY } = useTheme()

  const { data, isLoading, refetch } = useFetch<RankingProductDTO>(
    ['get-product-ranking-query'],
    async (authorization, branch) => {
      const response = await api(`rankingproduto${branch}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  )

  const TOTAL = useMemo(
    () =>
      data
        ? data[PERIOD.PRODUCT[period!]].reduce(
            (acc, curr) => acc + curr.valorTotal,
            0,
          )
        : 0,
    [data, period],
  )

  const DATA_BY_PERIOD = useMemo(() => {
    if (!(data && data[PERIOD.PRODUCT[period]].length !== 0)) return false

    return data[PERIOD.PRODUCT[period!]].map((item, index) => ({
      ...item,
      id: item.produtoId,
      posicao: `${item.posicao}°`,
      color: COLORS[index],
      percentage: ((item.valorTotal / TOTAL) * 100).toFixed(2) + '%',
    }))
  }, [data, period, TOTAL])

  const [chartData, setChartData] = useState<
    {
      color: string
      id: number
      localId: string
      posicao: string
      produtoId: number
      produtoNome: string
      quantidadeTotal: number
      valorTotal: number
      percentage: string
    }[]
  >([])

  const onSlideValueChange = useCallback(
    (value: [number, number]) => {
      if (DATA_BY_PERIOD) {
        clearTimeout(updateTimeout)

        updateTimeout = setTimeout(() => {
          setChartData(DATA_BY_PERIOD.slice(value[0], value[1]))
        }, 500)
      }
    },
    [DATA_BY_PERIOD],
  )

  useEffect(() => {
    if (DATA_BY_PERIOD) setChartData(DATA_BY_PERIOD)
  }, [DATA_BY_PERIOD])

  useEffect(() => {
    if (!DATA_BY_PERIOD) setSelected(null)
  }, [DATA_BY_PERIOD, setSelected])

  const { top } = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: top + 24 }}>
      <P
        style={{
          fontFamily: fonts['urbanist-bold'],
          fontSize: 14,
        }}>
        PRODUTOS
      </P>

      <P
        style={{
          fontFamily: fonts['urbanist-bold'],
          paddingHorizontal: 24,
          fontSize: 24,
          marginVertical: 12,
        }}>
        {show ? currency(TOTAL) : '-'}
      </P>

      <FilterPeriod />

      <ScrollView
        contentContainerStyle={{ height: HEIGHT, width: WIDTH }}
        scrollEnabled={false}
        refreshControl={
          chart !== 'B. HORIZONTAL' ? (
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          ) : undefined
        }>
        {expand ? null : <></>}

        {isLoading ? (
          <View className="flex-1 flex-row items-center justify-center">
            <ActivityIndicator color="#305a96" />
            <P className="ml-5 font-inter-semibold text-xs uppercase">
              CARREGANDO PRODUTOS...
            </P>
          </View>
        ) : (
          <>
            {!DATA_BY_PERIOD ? (
              <Chart.Empty />
            ) : (
              <>
                <Average
                  bigger={
                    DATA_BY_PERIOD
                      ? currency(
                          DATA_BY_PERIOD[DATA_BY_PERIOD.length - 1].valorTotal,
                        )
                      : ' 0'
                  }
                  average={
                    DATA_BY_PERIOD && TOTAL
                      ? currency(TOTAL / DATA_BY_PERIOD.length)
                      : ' 0'
                  }
                  smaller={
                    DATA_BY_PERIOD
                      ? currency(DATA_BY_PERIOD[0].valorTotal)
                      : ' 0'
                  }
                />

                <View style={styles.sliderContainer}>
                  <CustomSlider
                    range={[0, DATA_BY_PERIOD.length]}
                    maximumValue={DATA_BY_PERIOD.length}
                    onValueChange={onSlideValueChange}
                  />
                </View>

                <View
                  className="relative flex-1 items-center justify-center"
                  style={{
                    marginTop: chart === 'PIZZA' || chart === 'ROSCA' ? 56 : 0,
                  }}>
                  {DATA_BY_PERIOD && !isLoading ? (
                    <SelectedChart data={DATA_BY_PERIOD} />
                  ) : null}
                </View>
              </>
            )}

            {chart === 'PIZZA' || chart === 'ROSCA' ? (
              <View className="flex-1" />
            ) : null}
          </>
        )}
      </ScrollView>

      <Sheet.Root
        ref={sheetRef}
        index={!DATA_BY_PERIOD ? 0 : selected || expand ? 3 : 1}>
        {selected ? (
          <View className="w-full p-10">
            <View className="flex-row items-center justify-between">
              <P className="mr-2.5 font-urbanist-semibold text-2xl">
                {selected.posicao}
              </P>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelected(null)}
                className="h-10 flex-row items-center justify-center rounded-full border border-red-500 px-5">
                <Text className="mr-2 font-inter-semibold text-xs text-red-500">
                  FECHAR
                </Text>
                <Ionicons name="chevron-down" size={16} color={red[500]} />
              </TouchableOpacity>
            </View>

            <P className="my-10 font-urbanist-semibold text-2xl capitalize">
              {selected.produtoNome}
            </P>

            <View className="flex-row items-center">
              <View
                className="mr-1.5 flex-1 rounded-md p-5"
                style={{ height: 80, backgroundColor: BACKGROUND_SECONDARY }}>
                <P className="mb-2.5 font-inter-semibold text-xs text-zinc-500">
                  VALOR
                </P>
                <View className="flex-row items-center">
                  <P className="mr-1.5 font-urbanist-semibold text-lg -tracking-wider">
                    {currency(selected.valorTotal)}
                  </P>

                  {TOTAL && (
                    <P
                      className="rounded-full px-4 py-2 font-urbanist-semibold text-xs text-white"
                      style={{ backgroundColor: '#305a96' }}>
                      {((selected.valorTotal / TOTAL) * 100).toFixed(2)}%
                    </P>
                  )}
                </View>
              </View>

              <View
                className="ml-1.5 flex-1 rounded-md bg-zinc-100 p-5"
                style={{
                  height: 80,
                  backgroundColor: BACKGROUND_SECONDARY,
                }}>
                <P className="mb-2.5 font-inter-semibold text-xs text-zinc-500">
                  QUANTIDADE
                </P>
                <View className="flex-row items-center">
                  <P
                    className="mr-1.5 font-urbanist-semibold text-lg -tracking-wider"
                    numberOfLines={1}>
                    {selected.quantidadeTotal}
                  </P>
                </View>
              </View>
            </View>

            <Link
              asChild
              href={`/details/vendaproduto/codigoProduto=${selected.id}/${selected.produtoNome}`}>
              <TouchableOpacity
                activeOpacity={0.8}
                className="mt-10 h-14 flex-row items-center justify-center rounded-lg border-4 border-[#305a96]/20 bg-[#305a96] px-2.5">
                <Text className="mr-2.5 font-inter-semibold text-xs text-white">
                  VER MAIS DETALHES
                </Text>
                <Ionicons name="arrow-forward" size={16} color={white} />
              </TouchableOpacity>
            </Link>
          </View>
        ) : (
          <>
            <Sheet.Header />

            <Sheet.List
              data={!chartData ? [] : chartData}
              keyExtractor={(item) => item.produtoNome}
              renderItem={({ item }) => (
                <Sheet.ListRow
                  onPress={() => setSelected(!selected ? item : null)}>
                  <Sheet.ListColor color={item.color} />

                  <Sheet.ListItem style={{ width: '20%' }}>
                    <Sheet.ListItemTitle>{item.posicao}</Sheet.ListItemTitle>
                  </Sheet.ListItem>

                  <Sheet.ListItem
                    style={{ width: '50%', justifyContent: 'flex-start' }}>
                    <Sheet.ListItemTitle>
                      {item.produtoNome}
                    </Sheet.ListItemTitle>
                  </Sheet.ListItem>

                  <Sheet.ListItem>
                    <Sheet.ListItemTitle style={{ color: colors.green[500] }}>
                      {variant === 'QNT'
                        ? item.quantidadeTotal
                        : `${currency(item.valorTotal)}`}
                      {'   '}
                      <P style={{ marginLeft: 4, color: '#71717a' }}>
                        {item.percentage}
                      </P>
                    </Sheet.ListItemTitle>
                  </Sheet.ListItem>
                </Sheet.ListRow>
              )}
            />
          </>
        )}
      </Sheet.Root>
    </View>
  )
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 40,
    marginTop: 10,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 50,
  },
})
 */

import { Feather } from '@expo/vector-icons'
import { Path, useFont, Text as RNSText } from '@shopify/react-native-skia'
import React, { useMemo } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import PagerView from 'react-native-pager-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Bar,
  CartesianChart,
  useBarPath,
  useChartPressState,
} from 'victory-native'
import { api } from '~/api/api'
import { PERIOD } from '~/components/filter'
import { Icon } from '~/components/icon'
import { P } from '~/components/p'
import { useFetch } from '~/hooks/use-fetch'
import { useChart, usePeriod } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'
import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'
import { RankingProductDTO } from '~/types/ranking-product-dto'
import { WIDTH } from '~/utils/chart-size'
import { COLORS } from '~/utils/colors'

import urbanist from '../assets/fonts/urbanist/Urbanist-Bold.ttf'
import { currency } from '~/utils/currency'

export default function MyPager() {
  const { top } = useSafeAreaInsets()
  const { theme } = useTheme()

  const { period } = usePeriod()

  const { data } = useFetch<RankingProductDTO>(
    ['get-product-ranking-query'],
    async (authorization, branch) => {
      const response = await api(`rankingproduto${branch}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  )

  const TOTAL = useMemo(
    () =>
      data
        ? data[PERIOD.PRODUCT[period!]].reduce(
            (acc, curr) => acc + curr.valorTotal,
            0,
          )
        : 0,
    [data, period],
  )

  const DATA_BY_PERIOD = useMemo(() => {
    if (!(data && data[PERIOD.PRODUCT[period]].length !== 0)) return false

    return data[PERIOD.PRODUCT[period!]].map((item, index) => ({
      ...item,
      id: item.produtoId,
      posicao: item.posicao,
      color: COLORS[index],
      percentage: ((item.valorTotal / TOTAL) * 100).toFixed(2) + '%',
    }))
  }, [data, period, TOTAL])

  const font = useFont(urbanist, 10)
  const state = useChartPressState({ x: 's', y: { y1: 0, y2: 0 } })
  console.log('state', state)

  return (
    <>
      <PagerView style={s.pagerView} initialPage={0}>
        <View
          key="1"
          style={{ flex: 1, paddingHorizontal: 24, paddingTop: top + 12 }}>
          <View style={s.header}>
            <P style={s.heading}>Produtos</P>

            {/** <P
                style={{
                  fontFamily: fonts['urbanist-bold'],
                  fontSize: 9,
                  color: themes[theme].textForeground,
                  marginTop: 4,
                }}>
                Atualizado há 2 minutos
              </P> */}
          </View>

          <View style={s.totalPreviewContainer}>
            <View style={s.totalPreviewCard}>
              <P
                style={[
                  s.totalPreviewDescription,
                  {
                    color: themes[theme].textForeground,
                  },
                ]}>
                Faturamento Mensal
              </P>

              <View>
                <P
                  style={{
                    fontFamily: fonts['urbanist-semibold'],
                    fontSize: 28,
                    letterSpacing: -0.5,
                  }}>
                  R$ 25.562
                  <P style={{ color: themes[theme].textForeground }}>,56</P>
                </P>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <Icon name="arrow-up" color={colors.green[500]} />
                  <P
                    style={{
                      color: colors.green[500],
                      fontFamily: fonts['urbanist-bold'],
                      fontSize: 11,
                      textTransform: 'capitalize',
                      marginLeft: 4,
                    }}
                    numberOfLines={2}>
                    {data ? data.firstOfMonthDTOList[0].produtoNome : null}
                  </P>
                </View>
              </View>
            </View>

            <View
              style={{
                height: 160,
                borderLeftWidth: 1,
                borderColor: themes[theme].border,
                width: '50%',
              }}>
              <View
                style={[
                  s.totalPreviewCard,
                  {
                    height: 60,
                    borderBottomWidth: 1,
                    borderColor: themes[theme].border,
                    paddingLeft: 24,
                  },
                ]}>
                <P
                  style={{
                    fontFamily: fonts['urbanist-bold'],
                    fontSize: 13,
                    letterSpacing: -0.5,
                  }}>
                  R$ 2.569
                  <P style={{ color: themes[theme].textForeground }}>,78</P>
                </P>

                <P
                  style={[
                    s.totalPreviewDescription,
                    {
                      marginTop: 4,
                      color: themes[theme].textForeground,
                    },
                  ]}>
                  Faturamento Semanal
                </P>
              </View>

              <View
                style={[s.totalPreviewCard, { height: 60, paddingLeft: 24 }]}>
                <P
                  style={{
                    fontFamily: fonts['urbanist-bold'],
                    fontSize: 13,
                    letterSpacing: -0.5,
                  }}>
                  R$ 65
                  <P style={{ color: themes[theme].textForeground }}>,78</P>
                </P>

                <P
                  style={[
                    s.totalPreviewDescription,
                    {
                      marginTop: 4,
                      color: themes[theme].textForeground,
                    },
                  ]}>
                  Faturamento Diário
                </P>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
              <P
                style={{
                  fontFamily: fonts['inter-semibold'],
                  letterSpacing: -0.5,
                  fontSize: 11,
                }}>
                Jul 1 - Jul 21
              </P>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: themes[theme].border,
                  height: 32,
                  paddingHorizontal: 18,
                  marginLeft: 12,
                  borderRadius: 999,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <P
                  style={{
                    fontFamily: fonts['inter-semibold'],
                    letterSpacing: -0.5,
                    fontSize: 11,
                  }}>
                  Mês
                </P>

                <Icon
                  name="chevron-down"
                  style={{ marginTop: 2 }}
                  color="#305a96"
                />
              </View>
            </Pressable>

            <Pressable
              style={{
                height: 32,
                borderRadius: 999,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              <Feather name="arrow-up-right" size={14} color="#305a96" />

              <P
                style={{
                  fontFamily: fonts['inter-semibold'],
                  letterSpacing: -0.25,
                  fontSize: 11,
                  textDecorationLine: 'underline',
                  color: theme === 'dark' ? colors.zinc[300] : colors.zinc[700],
                }}>
                Mais filtros
              </P>
            </Pressable>
          </View>

          {/** <View
            className="relative flex-1 items-center justify-center"
            style={{
              marginTop: chart === 'PIZZA' || chart === 'ROSCA' ? 56 : 0,
            }}>
            {DATA_BY_PERIOD && !isLoading ? (
              <SelectedChart data={DATA_BY_PERIOD} />
            ) : null}
          </View> */}

          <View style={{ height: 400, maxWidth: WIDTH - 40, marginTop: 24 }}>
            {DATA_BY_PERIOD ? (
              <CartesianChart
                data={DATA_BY_PERIOD}
                xKey="posicao"
                yKeys={['valorTotal', 'quantidadeTotal']}
                domainPadding={{ left: 16, right: 16 }}
                axisOptions={{
                  font,
                  formatYLabel: (value) =>
                    currency(value).replace(/\.000,00$/, 'k'),
                  formatXLabel: (value) => value + '°',
                  tickCount: DATA_BY_PERIOD.length / 2,
                  lineWidth: 1,
                  lineColor: themes[theme].border,
                }}>
                {({ points, chartBounds }) => {
                  return (
                    <>
                      {points.valorTotal.map((point, index) => (
                        <Bar
                          key={index}
                          barCount={points.valorTotal.length}
                          points={[point]}
                          chartBounds={chartBounds}
                          barWidth={5}
                          animate={{ type: 'timing' }}
                          color={COLORS[index]}>
                          {/** <RNSText font={font} text="45%" color="#000" /> */}
                        </Bar>
                      ))}
                    </>
                  )
                }}
              </CartesianChart>
            ) : null}
          </View>
        </View>

        <View
          key="2"
          style={{ flex: 1, paddingHorizontal: 24, paddingTop: top + 12 }}>
          <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 24 }}>
            Marcas
          </P>
        </View>
      </PagerView>
    </>
  )
}

const s = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 24,
  },
  totalPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  totalPreviewDescription: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 10,
    marginBottom: 4,
    letterSpacing: -0.15,
  },
  totalPreviewCard: {
    height: 120,
    flex: 1,
    justifyContent: 'center',
  },
})

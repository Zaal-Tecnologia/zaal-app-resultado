import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { Link } from 'expo-router'

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

import { Average } from '~/components/average'
import { CustomSlider } from '~/components/custom-slider'
import { Container } from '~/components/Container'
import { Header } from '~/components/header'
import { useTheme } from '~/hooks/use-theme'
import { SelectedChart } from '~/components/selected-chart'
import { RankingBrandDTO } from '~/types/ranking-brand-dto'
import { colors } from '~/styles/colors'

let updateTimeout: NodeJS.Timeout

export default function Brand() {
  const sheetRef = useSheet()

  const { period } = usePeriod()
  const { selected, setSelected } = useSelected()
  const { chart } = useChart()
  const { show } = useShow()
  const { expand } = useExpand()
  const { variant } = useVariant()

  const { BACKGROUND_SECONDARY } = useTheme()

  const { data, isLoading, refetch } = useFetch<RankingBrandDTO>(
    ['get-brand-ranking-query'],
    async (authorization, branch) => {
      const response = await api(`rankingmarca${branch}`, {
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
        ? data[PERIOD.BRAND[period!]].reduce(
            (acc, curr) => acc + curr.valorTotal,
            0,
          )
        : 0,
    [data, period],
  )

  const DATA_BY_PERIOD = useMemo(() => {
    if (!(data && data[PERIOD.BRAND[period]].length !== 0)) return false

    return data[PERIOD.BRAND[period!]].map((item, index) => ({
      ...item,
      id: item.marcaId,
      posicao: `${item.posicao}°`,
      color: COLORS[index],
      percentage: ((item.valorTotal / TOTAL) * 100).toFixed(2) + '%',
    }))
  }, [TOTAL, data, period])

  const [chartData, setChartData] = useState<
    {
      color: string
      id: number
      localId: string
      posicao: string
      marcaId: number
      marcaNome: string
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

  return (
    <Container>
      <Header.Root style={{ paddingHorizontal: 20 }}>
        <Header.Back>MARCAS</Header.Back>
        <Header.Content />
      </Header.Root>

      <ScrollView
        contentContainerStyle={{ height: HEIGHT, width: WIDTH }}
        scrollEnabled={false}
        refreshControl={
          chart !== 'B. HORIZONTAL' ? (
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          ) : undefined
        }>
        {expand ? null : (
          <>
            <P className="px-6 font-urbanist-semibold text-[24px]">
              {show ? currency(TOTAL) : '-'}
            </P>

            <Filter>
              <FilterPeriod />
              <FilterVariant />
              <FilterChart />
            </Filter>
          </>
        )}

        {isLoading ? (
          <View className="flex-1 flex-row items-center justify-center">
            <ActivityIndicator color="#305a96" />
            <P className="ml-5 font-inter-semibold text-xs uppercase">
              CARREGANDO MARCAS...
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
              {selected.marcaNome}
            </P>

            <View className="flex-row items-center">
              <View
                className="mr-1.5 flex-1 rounded-md p-5"
                style={{
                  height: 80,
                  backgroundColor: BACKGROUND_SECONDARY,
                }}>
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
              href={`/details/vendamarca/codigoMarca=${selected.id}/${selected.marcaNome}`}>
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
              keyExtractor={(item) => item.marcaNome}
              renderItem={({ item }) => (
                <Sheet.ListRow
                  onPress={() => setSelected(!selected ? item : null)}>
                  <Sheet.ListColor color={item.color} />

                  <Sheet.ListItem className="w-[20%] items-center">
                    <Sheet.ListItemTitle>{item.posicao}</Sheet.ListItemTitle>
                  </Sheet.ListItem>

                  <Sheet.ListItem className="w-[50%]">
                    <Sheet.ListItemTitle className="font-inter-medium">
                      {item.marcaNome}
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
    </Container>
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

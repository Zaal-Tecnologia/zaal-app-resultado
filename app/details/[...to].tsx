/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  RefreshControl,
} from 'react-native'

import { api } from '~/api/api'

import { Chart } from '~/components/chart'
import { P } from '~/components/p'
import {
  Sheet,
  SheetListColor,
  SheetListItem,
  SheetListItemTitle,
  SheetListRow,
  SheetList,
} from '~/components/sheet'
import { VARIANT } from '~/components/filter'

import { useFetch } from '~/hooks/use-fetch'
import { useChart, useExpand, usePeriod, useVariant } from '~/hooks/use-filters'
import { useSelected } from '~/hooks/use-selected'
import { useSheet } from '~/hooks/use-sheet'

import { HEIGHT, WIDTH } from '~/utils/chart-size'
import { COLORS } from '~/utils/colors'
import { currency } from '~/utils/currency'

import { Container } from '~/components/Container'
import { fonts } from '~/styles/fonts'
import { MemoizedSalesPreviewByPage } from '~/components/sales-preview-by-page'
import { Icon } from '~/components/icon'
import { useTheme } from '~/hooks/use-theme'
import { Shimmer } from '~/components/shimmer'
import { SelectedChart } from '~/components/selected-chart'
import { ISale, TotalSalesResponseDTO } from '~/types/total-sales-response-dto'
import { FilterPageOptions } from '~/components/filter-page-options'
import { Feather } from '@expo/vector-icons'
import { colors } from '~/styles/colors'

const WEEK = {
  1: 'DOM.',
  2: 'SEG.',
  3: 'TER.',
  4: 'QUA.',
  5: 'QUI.',
  6: 'SEX.',
  7: 'SÁB.',
} as const

type SaleKey = 'semanaCorrente' | 'mesCorrente' | 'diaCorrente'

export type Data = {
  DIA: { TOTAL: number; CHART: ISale[] }
  SEMANA: { TOTAL: number; CHART: ISale[] }
  MÊS: { TOTAL: number; CHART: ISale[] }
}

export default function SalesDetails() {
  const { to } = useLocalSearchParams() as { to: [string, string, string] }

  const [url, param, name] = to

  const sheetRef = useSheet()
  const { period } = usePeriod()
  const { expand } = useExpand()
  const { chart } = useChart()
  const { variant } = useVariant()

  const { selected, setSelected } = useSelected()

  const { data, isLoading, refetch } = useFetch<Data>(
    ['get-details-from-sales-query'],
    async (authorization, branch) => {
      const response = await api(`${url}${branch}&${param}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      const json = (await response.json()) as TotalSalesResponseDTO

      const { diaCorrente, mesCorrente, semanaCorrente } = json

      const TOTAL = {
        MÊS: mesCorrente.reduce((acc, curr) => acc + curr[VARIANT[variant]], 0),
        SEMANA: semanaCorrente.reduce(
          (acc, curr) => acc + curr[VARIANT[variant]],
          0,
        ),
        DIA: diaCorrente.reduce((acc, curr) => acc + curr[VARIANT[variant]], 0),
      }

      const CHART = Object.keys(json).map((item) =>
        json[item as SaleKey].map((i, idx) => ({
          ...i,
          id: i.indice,
          posicao:
            period === 'SEMANA'
              ? // @ts-ignore
                `${WEEK[i.indice]}`
              : period === 'MÊS'
                ? `S${i.indice}`
                : period === 'DIA'
                  ? `${i.indice}H`
                  : '',
          color: COLORS[idx],
          quantidadeTotal: i.quantidadeTotal.toFixed(2),
          percentage: `${((i[VARIANT[variant]] / TOTAL[period]) * 100).toFixed(1)}%`, // acho que dá para tirar period daqui
        })),
      )

      return {
        DIA: { TOTAL: TOTAL.DIA, CHART: CHART[0] },
        SEMANA: { TOTAL: TOTAL.SEMANA, CHART: CHART[1] },
        MÊS: { TOTAL: TOTAL.MÊS, CHART: CHART[2] },
      }
    },
  )

  const DATA = data ? data[period] : null

  const { back } = useRouter()
  const { theme } = useTheme()

  return (
    <Container>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }>
        <Pressable onPress={back} style={s.filterGoBack}>
          <Icon name="chevron-back" size={16} />
          <P style={s.title}>{name}</P>
        </Pressable>

        <MemoizedSalesPreviewByPage
          bestSellerName={undefined}
          isLoading={isLoading}
          total={
            data ? [data.MÊS.TOTAL, data.SEMANA.TOTAL, data.DIA.TOTAL] : []
          }
        />

        <FilterPageOptions />

        {isLoading && (
          <Shimmer
            width={WIDTH - 40}
            height={HEIGHT - 600}
            style={s.chartLoading}
          />
        )}

        {DATA && (
          <>
            {DATA.CHART.length === 0 ? (
              <Chart.Empty />
            ) : (
              <View
                style={{
                  marginTop: chart === 'PIZZA' || chart === 'ROSCA' ? 64 : 0,
                }}>
                {DATA.CHART ? <SelectedChart data={DATA.CHART} /> : null}
              </View>
            )}
          </>
        )}

        <Sheet ref={sheetRef} index={!DATA ? 0 : selected || expand ? 4 : 1}>
          <View
            className="h-8 w-full flex-row items-center"
            style={{
              backgroundColor: '#305a9620',
            }}>
            <View className="h-full w-[20%] items-center justify-center">
              <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>
                Pos.
              </P>
            </View>

            <View className="h-full w-[30%] items-start justify-center">
              <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>
                Quantidade
              </P>
            </View>

            <View className="h-full w-[50%] items-start justify-center">
              <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>
                Valor
              </P>
            </View>

            {/** <View className="h-full w-[20%] items-start justify-center">
        <P className="font-inter-medium text-xs">QUANTIDADE</P>
      </View> */}
          </View>

          <SheetList
            data={!DATA ? [] : DATA.CHART}
            keyExtractor={(item) => item.posicao}
            ListFooterComponent={() =>
              DATA
                ? DATA.CHART.length === 20 && (
                    <Pressable
                      style={[
                        s.loadMoreButton,
                        {
                          backgroundColor:
                            theme === 'light' ? '#305a9620' : '#305a9680',
                        },
                      ]}>
                      <Feather
                        name="arrow-up-right"
                        color="#305a96"
                        size={18}
                      />
                      <P style={s.loadMoreButtonTitle}>Carregar + 10 items</P>
                    </Pressable>
                  )
                : null
            }
            renderItem={({ item }) => (
              <SheetListRow
                onPress={() => setSelected(!selected ? item : null)}>
                <SheetListColor color={item.color} />

                <SheetListItem
                  style={{ width: '20%', justifyContent: 'center' }}>
                  <SheetListItemTitle>{item.posicao}</SheetListItemTitle>
                </SheetListItem>

                <SheetListItem style={{ width: '30%' }}>
                  <SheetListItemTitle className="font-inter-medium">
                    {item.quantidadeTotal}
                  </SheetListItemTitle>
                </SheetListItem>

                <SheetListItem style={{ width: '50%' }}>
                  <SheetListItemTitle style={{ color: colors.green[500] }}>
                    {variant === 'QNT'
                      ? item.quantidadeTotal
                      : `${currency(item.valorTotal)}`}
                    {'   '}
                    <P style={{ marginLeft: 4, color: '#71717a' }}>
                      {item.percentage}
                    </P>
                  </SheetListItemTitle>
                </SheetListItem>
              </SheetListRow>
            )}
          />
        </Sheet>
      </ScrollView>
    </Container>
  )
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts['urbanist-bold'],
    textTransform: 'capitalize',
  },
  filterGoBack: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chartLoading: { marginHorizontal: 20, marginTop: 40 },
  loadMoreButton: {
    position: 'relative',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreButtonTitle: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 13,
  },
})

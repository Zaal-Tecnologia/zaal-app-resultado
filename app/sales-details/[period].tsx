/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo } from 'react'
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  RefreshControl,
} from 'react-native'
// import { Feather } from '@expo/vector-icons'

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

import { useFetch } from '~/hooks/use-fetch'
import { useChart, useExpand, usePeriod, useVariant } from '~/hooks/use-filters'
import { useSelected } from '~/hooks/use-selected'
import { useSheet } from '~/hooks/use-sheet'

import { HEIGHT, WIDTH } from '~/utils/chart-size'
import { COLORS } from '~/utils/colors'
import { currency } from '~/utils/currency'

import type { TotalSalesDTO } from '~/types/total-sales-dto'
import { Container } from '~/components/Container'
// import { useTheme } from '~/hooks/use-theme'
import { SelectedChart } from '~/components/selected-chart'
import { fonts } from '~/styles/fonts'

import { FilterPageOptions } from '~/components/filter-page-options'
import { Shimmer } from '~/components/shimmer'
import { MemoizedSalesPreviewByPage } from '~/components/sales-preview-by-page'
import { ISale } from '~/types/total-sales-response-dto'
import { colors } from '~/styles/colors'
import { VARIANT } from '~/constants/variant'
import { Icon } from '~/components/icon'

const WEEK = {
  2: 'SEG',
  3: 'TER',
  4: 'QUA',
  5: 'QUI',
  6: 'SEX',
  7: 'SÁB',
} as const

type SaleKey = 'semanaCorrente' | 'mesCorrente' | 'diaCorrente'

export type Data = {
  DIA: { TOTAL: number; CHART: ISale[] }
  SEMANA: { TOTAL: number; CHART: ISale[] }
  MÊS: { TOTAL: number; CHART: ISale[] }
}

export default function SalesDetails() {
  const { period } = useLocalSearchParams() as {
    period: 'MÊS' | 'SEMANA' | 'DIA'
  }

  const sheetRef = useSheet()
  const { period: filterPeriod, setPeriod } = usePeriod()
  const { expand } = useExpand()
  const { variant } = useVariant()
  const { chart } = useChart()
  const { selected, setSelected } = useSelected()
  // const { theme } = useTheme()

  const { data, isLoading, refetch } = useFetch<Data>(
    ['get-total-sales-query', filterPeriod],
    async (authorization, branch) => {
      const response = await api(`vendatotal${branch}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      const json = (await response.json()) as TotalSalesDTO

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
            filterPeriod === 'SEMANA'
              ? // @ts-ignore
                `${WEEK[i.indice]}`
              : filterPeriod === 'MÊS'
                ? `S${i.indice}`
                : filterPeriod === 'DIA'
                  ? `${i.indice}H`
                  : '',
          color: COLORS[idx],
          quantidadeTotal: i.quantidadeTotal.toFixed(2),
          percentage: `${((i[VARIANT[variant]] / TOTAL[filterPeriod]) * 100).toFixed(1)}%`, // acho que dá para tirar period daqui
        })),
      )

      return {
        DIA: { TOTAL: TOTAL.DIA, CHART: CHART[0] },
        SEMANA: { TOTAL: TOTAL.SEMANA, CHART: CHART[1] },
        MÊS: { TOTAL: TOTAL.MÊS, CHART: CHART[2] },
      }
    },
  )

  const DATA = useMemo(
    () => (data ? data[filterPeriod] : null),
    [data, filterPeriod],
  )

  useEffect(() => {
    setPeriod(period)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }>
        <Stack.Screen options={{ headerShown: false }} />

        <Link href="/home/">
          <Pressable style={s.headerLeftContent}>
            <Icon name="arrow-back" size={16} />
            <P style={s.title}>Vendas</P>
          </Pressable>
        </Link>

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
            style={{
              backgroundColor: '#305a9620',
              height: 32,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>
                Pos.
              </P>
            </View>

            <View
              style={{
                height: '100%',
                width: '30%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>
                Quantidade
              </P>
            </View>

            <View
              style={{
                height: '100%',
                width: '50%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <P style={{ fontFamily: fonts['urbanist-bold'], fontSize: 13 }}>
                Valor
              </P>
            </View>
          </View>
          <SheetList
            data={!DATA ? [] : DATA.CHART}
            keyExtractor={(item) => item.posicao}
            // ListFooterComponent={() =>
            //   DATA
            //     ? DATA.CHART.length === 20 && (
            //         <Pressable
            //           style={[
            //             s.loadMoreButton,
            //             {
            //               backgroundColor:
            //                 theme === 'light' ? '#305a9620' : '#305a9680',
            //             },
            //           ]}>
            //           <Feather
            //             name="arrow-up-right"
            //             color="#305a96"
            //             size={18}
            //           />
            //           <P style={s.loadMoreButtonTitle}>Carregar + 10 items</P>
            //         </Pressable>
            //       )
            //     : null
            // }
            renderItem={({ item }) => (
              <SheetListRow
                onPress={() => setSelected(!selected ? item : null)}>
                <SheetListColor color={item.color} />

                <SheetListItem
                  style={{ width: '20%', justifyContent: 'center' }}>
                  <SheetListItemTitle>{item.posicao}</SheetListItemTitle>
                </SheetListItem>

                <SheetListItem style={{ width: '30%' }}>
                  <SheetListItemTitle>
                    {item.quantidadeTotal}
                  </SheetListItemTitle>
                </SheetListItem>

                <SheetListItem style={{ width: '50%' }}>
                  <SheetListItemTitle style={{ color: colors.green[500] }}>
                    {currency(item.valorTotal)}
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
  title: { fontSize: 18, fontFamily: fonts['urbanist-bold'] },
  goPageButton: {
    height: 32,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 16,
  },
  goPageButtonText: {
    fontFamily: fonts['inter-semibold'],
    letterSpacing: -0.25,
    fontSize: 11,
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

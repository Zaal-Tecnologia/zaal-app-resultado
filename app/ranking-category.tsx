import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import { useEffect } from 'react'

import { api } from '~/api/api'

import { VARIANT } from '~/components/filter'
import { Chart } from '~/components/chart'
import {
  Sheet,
  SheetHeader,
  SheetListColor,
  SheetListItem,
  SheetListItemTitle,
  SheetListRow,
  SheetList,
} from '~/components/sheet'
import { P } from '~/components/p'
import { Container } from '~/components/Container'
import { SelectedChart } from '~/components/selected-chart'
import { MemoizedSalesPreviewByPage } from '~/components/sales-preview-by-page'
import {
  Selected,
  SelectedClose,
  SelectedDetails,
  SelectedPrice,
  SelectedQuantity,
  SelectedTitle,
} from '~/components/selected'
import { Shimmer } from '~/components/shimmer'
import { FilterPageOptions } from '~/components/filter-page-options'

import { currency } from '~/utils/currency'
import { COLORS } from '~/utils/colors'

import { useChart, useExpand, usePeriod, useVariant } from '~/hooks/use-filters'
import { useFetch } from '~/hooks/use-fetch'
import { useSelected } from '~/hooks/use-selected'
import { useSheet } from '~/hooks/use-sheet'
import { useTheme } from '~/hooks/use-theme'

import { HEIGHT, WIDTH } from '~/utils/chart-size'

import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'

import type {
  ICategory,
  RankingCategoryDTO,
} from '~/types/ranking-category-dto'
import { Icon } from '~/components/icon'

type CategoryKeys =
  | 'firstOfDayToList'
  | 'firstOfMonthToList'
  | 'firstOfWeekToList'

export type Data = {
  DIA: { TOTAL: number; CHART: ICategory[] }
  SEMANA: { TOTAL: number; CHART: ICategory[] }
  MÊS: { TOTAL: number; CHART: ICategory[] }
}

const MonthPosition = 0

export default function Category() {
  const sheetRef = useSheet()

  const { period } = usePeriod()
  const { selected, setSelected } = useSelected()
  const { chart } = useChart()
  const { expand } = useExpand()
  const { variant } = useVariant()

  const { data, isLoading, refetch } = useFetch<Data>(
    ['get-category-ranking-query'],
    async (authorization, branch) => {
      const response = await api(`rankingcategoria${branch}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      const json = (await response.json()) as RankingCategoryDTO

      const { firstOfDayToList, firstOfMonthToList, firstOfWeekToList } = json

      const TOTAL = {
        MÊS: firstOfMonthToList.reduce(
          (acc, curr) => acc + curr[VARIANT[variant]],
          0,
        ),
        SEMANA: firstOfWeekToList.reduce(
          (acc, curr) => acc + curr[VARIANT[variant]],
          0,
        ),
        DIA: firstOfDayToList.reduce(
          (acc, curr) => acc + curr[VARIANT[variant]],
          0,
        ),
      }

      const CHART = Object.keys(json).map((item) =>
        json[item as CategoryKeys].map((i, idx) => ({
          ...i,
          id: i.categoriaId,
          posicao: `${i.posicao}°`,
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

  const { theme } = useTheme()

  useEffect(() => {
    setSelected(false)
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

        <View style={s.header}>
          <Link href="/home/" asChild>
            <Pressable style={s.headerLeftContent}>
              <Icon name="arrow-back" size={16} />
              <P style={s.title}>Categorias</P>
            </Pressable>
          </Link>

          <Link href="/ranking-brand" asChild>
            <Pressable style={s.goPageButton} hitSlop={40}>
              <P
                style={[
                  s.goPageButtonText,
                  {
                    color:
                      theme === 'dark' ? colors.zinc[300] : colors.zinc[700],
                  },
                ]}>
                Marcas
              </P>

              <Feather name="arrow-right" size={16} color="#305a96" />
            </Pressable>
          </Link>
        </View>

        <MemoizedSalesPreviewByPage
          bestSellerName={DATA ? DATA.CHART[MonthPosition]?.categoriaNome : ''}
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
          {selected ? (
            <Selected>
              <SelectedClose />

              <SelectedTitle>
                Em {selected?.posicao} lugar{' '}
                {selected?.categoriaNome?.toLowerCase()}
              </SelectedTitle>

              <SelectedPrice
                TOTAL={DATA ? DATA.TOTAL : 0}
                totalValue={selected?.valorTotal}
              />

              <SelectedQuantity
                TOTAL={DATA ? DATA.TOTAL : 0}
                totalQuantity={selected?.quantidadeTotal}
              />

              <SelectedDetails
                href={`/details/vendacategoria/codigoCategoria=${selected?.id}/${selected?.categoriaNome}`}
              />
            </Selected>
          ) : (
            <>
              <SheetHeader />

              <SheetList
                data={!DATA ? [] : DATA.CHART}
                keyExtractor={(item) => item?.categoriaNome}
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
                          <P style={s.loadMoreButtonTitle}>
                            Carregar + 10 items
                          </P>
                        </Pressable>
                      )
                    : null
                }
                renderItem={({ item }) => (
                  <SheetListRow
                    onPress={() => setSelected(!selected ? item : null)}>
                    <SheetListItem
                      style={{ width: '20%', justifyContent: 'center' }}>
                      <SheetListColor color={item.color} />

                      <SheetListItemTitle>{item.posicao}</SheetListItemTitle>
                    </SheetListItem>

                    <SheetListItem style={{ width: '50%' }}>
                      <SheetListItemTitle>
                        {item?.categoriaNome}
                      </SheetListItemTitle>
                    </SheetListItem>

                    <SheetListItem style={{ width: '30%' }}>
                      <SheetListItemTitle style={{ color: colors.green[500] }}>
                        {variant === 'QNT'
                          ? item.quantity
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
            </>
          )}
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
  goPageButtonText: {
    fontFamily: fonts['inter-semibold'],
    letterSpacing: -0.25,
    fontSize: 11,
  },
  button: {
    paddingVertical: 12,
  },
  buttonTitle: {
    fontSize: 10,
    lineHeight: 20,
    fontFamily: fonts['urbanist-bold'],
  },
  buttonPrice: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 14,
    letterSpacing: -0.25,
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
  headerLeftContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
})

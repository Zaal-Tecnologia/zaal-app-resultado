import { Link, Stack } from 'expo-router'
import {
  Image,
  // RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
// import { useMemo } from 'react'

import { Container } from '~/components/Container'
// import { TopThreeProduct } from '~/components/top-three-product'
import { ProductCard } from '~/components/product-card'
import { SalesPreview } from '~/components/sales-preview'
import { P } from '~/components/p'
import { Icon } from '~/components/icon'
// import { InitialPageLoading } from '~/components/initial-page-loading'

import { useBranch } from '~/hooks/use-branch'
// import { useFetch } from '~/hooks/use-fetch'
import { useUsers } from '~/hooks/use-users'

import { useTheme } from '~/hooks/use-theme'

// import { api } from '~/api/api'

// import type { RankingProductDTO } from '~/types/ranking-product-dto'

// const COLORS = ['#DAA520', '#C0C0C0', '#CD7F32']

export default function Home() {
  const { user } = useUsers()

  const { branch } = useBranch()

  /** const { data, isLoading, refetch } = useFetch<RankingProductDTO>(
    ['get-product-ranking-query'],
    async (authorization) => {
      const response = await api('rankingproduto', {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  ) */

  /** const topThreeData = useMemo(
    () =>
      data
        ? data.firstOfMonthDTOList?.slice(0, 3).map((item, index) => ({
            ...item,
            value: item.valorTotal,
            color: COLORS[index],
            label: String(item.posicao),
          }))
        : [],
    [data],
  ) */

  //   const { removeAll } = useUsers()
  const { BACKGROUND_SECONDARY, BORDER_PRIMARY } = useTheme()

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />

      <Container className="p-6">
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          /** refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            } */
          contentContainerStyle={{ paddingBottom: 80 }}>
          <View className="mt-10 flex-row items-center justify-between">
            <Link href="/profile" asChild>
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-row items-center">
                <View
                  className="h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: BACKGROUND_SECONDARY }}>
                  <Image
                    alt=""
                    source={require('../assets/icon.png')}
                    resizeMode="contain"
                    className="h-16 w-16"
                  />
                </View>
                <View className="ml-2.5">
                  <P className="font-inter-medium text-sm -tracking-wide">
                    <Text className="text-zinc-500">Olá, </Text>
                    {user?.userLastName.slice(0, 20)}
                  </P>
                </View>
              </TouchableOpacity>
            </Link>
          </View>

          <SalesPreview />

          <Link asChild href="/branches">
            <TouchableOpacity
              activeOpacity={0.8}
              className="mb-2.5 h-14 flex-row items-center justify-between rounded-b-md rounded-t-2xl border pl-4 pr-5"
              style={{ borderColor: BORDER_PRIMARY }}>
              <View className="flex-row items-center">
                <Icon name="storefront" size={16} color="#305A96" />

                <P className="ml-2.5 font-inter-semibold text-xs uppercase -tracking-wide">
                  {branch.id === 0
                    ? 'TODAS AS FILIAIS'
                    : `${branch.nomeFantasia}`}
                </P>
              </View>

              <Icon name="chevron-forward" size={16} />
            </TouchableOpacity>
          </Link>

          <View className="h-80 flex-row items-center">
            <ProductCard />

            <View className="flex-1">
              <Link asChild href="/ranking-category">
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ borderTopRightRadius: 12, borderRadius: 4 }}
                  className="mb-1 h-24 flex-1 items-center justify-center bg-[#699DC6]">
                  <Text className="mr-1 font-inter-semibold text-[12px] text-white">
                    CATEGORIAS
                  </Text>
                </TouchableOpacity>
              </Link>

              <Link asChild href="/ranking-branch">
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ borderRadius: 4 }}
                  className="my-1 h-24 flex-1 items-center justify-center bg-[#50B79B]">
                  <Text className="mr-1 font-inter-semibold text-[12px] text-white">
                    FILIAIS
                  </Text>
                </TouchableOpacity>
              </Link>

              <Link asChild href="/ranking-brand">
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ borderBottomRightRadius: 32, borderRadius: 4 }}
                  className="mt-1 h-24 flex-1 items-center justify-center bg-[#A079F8]">
                  <Text className="mr-1 font-inter-semibold text-[12px] text-white">
                    MARCAS
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/** <TopThreeProduct topThreeData={topThreeData} /> */}
        </ScrollView>
      </Container>
    </>
  )
}

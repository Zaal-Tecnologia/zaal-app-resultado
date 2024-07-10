import { Link, Stack } from 'expo-router'
import {
  // RefreshControl,
  ScrollView,
  StyleSheet,
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

import { useTheme } from '~/hooks/use-theme'
import { FilterShow } from '~/components/filter'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import { User } from './(components)/user'
import { BestSellerCard } from './(components)/best-seller-card'

// import { api } from '~/api/api'

// import type { RankingProductDTO } from '~/types/ranking-product-dto'

// const COLORS = ['#DAA520', '#C0C0C0', '#CD7F32']

const Opacity = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.foreground}>
        <Text style={styles.text}>Componente em primeiro plano</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 200,
    height: 200,
    backgroundColor: 'blue',
    zIndex: 1,
  },
  foreground: {
    position: 'absolute',
    top: 100,
    left: 100,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Semi-transparente
    zIndex: 2,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 90,
  },
})

export default function Home() {
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
  const { BORDER_PRIMARY } = useTheme()

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />

      <Container>
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          /** refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            } */
          contentContainerStyle={{ paddingBottom: 80 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
            }}>
            <User />

            <FilterShow />
          </View>

          <SalesPreview />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 32,
            }}>
            {[
              'rankingmarca',
              'rankingproduto',
              'rankingcategoria',
              'rankingfilial',
            ].map((item) => (
              <BestSellerCard key={item} from={item} />
            ))}
          </ScrollView>

          <Link asChild href="/branches">
            <TouchableOpacity
              activeOpacity={0.8}
              className="mx-5 h-14 flex-row items-center justify-between border pl-4 pr-5"
              style={{
                marginBottom: 3,
                borderColor: BORDER_PRIMARY,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 16,
              }}>
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

          <View className="h-72 flex-row items-center px-5">
            <View className="flex-1" style={{ marginRight: 2 }}>
              <Link asChild href="/ranking-category">
                <TouchableOpacity activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#699DC6', '#699Dd1']}
                    style={{
                      height: 72,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      marginBottom: 2,
                    }}>
                    <Text className="mr-1 font-inter-semibold text-[12px] text-white">
                      CATEGORIAS
                    </Text>

                    <Feather
                      name="arrow-up-right"
                      color="#fff"
                      style={{ position: 'absolute', top: 15, right: 15 }}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </Link>

              <ProductCard />
            </View>

            <View className="ml-[1px] flex-1">
              <Link asChild href="/ranking-brand">
                <TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }}>
                  <LinearGradient
                    colors={['#A079F8', '#A079C8']}
                    style={{
                      height: 96,
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      marginBottom: 2,
                    }}>
                    <Text className="mr-1 font-inter-semibold text-[12px] text-white">
                      MARCAS
                    </Text>

                    <Feather
                      name="arrow-up-right"
                      color="#fff"
                      style={{ position: 'absolute', top: 15, right: 15 }}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </Link>

              <Link asChild href="/ranking-branch">
                <TouchableOpacity activeOpacity={0.8}>
                  <LinearGradient
                    colors={['#50B72B', '#50B75B']}
                    style={{
                      borderBottomRightRadius: 8,
                      height: 72,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}>
                    <Text className="mr-1 font-inter-semibold text-[12px] text-white">
                      FILIAIS
                    </Text>

                    <Feather
                      name="arrow-up-right"
                      color="#fff"
                      style={{ position: 'absolute', top: 15, right: 15 }}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/** <TopThreeProduct topThreeData={topThreeData} /> */}
        </ScrollView>

        <Opacity />
      </Container>
    </>
  )
}

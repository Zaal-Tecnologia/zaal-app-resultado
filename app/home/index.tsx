import { Stack, useRouter } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'

import { WIDTH } from '~/utils/chart-size'

import { Container } from '~/components/Container'
import { SalesPreview } from '~/components/sales-preview'
import { P } from '~/components/p'
import { Icon } from '~/components/icon'
import { FilterShow } from '~/components/filter'
import { Button } from '~/components/button'

import { User } from './(components)/user'
import { BestSellers } from './(components)/best-sellers'
import { LinkCard } from './(components)/link-card'

import { useBranch } from '~/hooks/use-branch'
import { useTheme } from '~/hooks/use-theme'

import { themes } from '~/styles/themes'
import { fonts } from '~/styles/fonts'

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
  const { theme } = useTheme()
  const { push } = useRouter()

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
          <View style={s.header}>
            <User />

            <FilterShow />
          </View>

          <SalesPreview />

          <BestSellers />

          <Button
            style={[{ borderColor: themes[theme].border }, s.branchButton]}
            onPress={() => push('/branches')}>
            <Icon name="storefront" size={24} color="#305A96" />
            <P style={s.branchButtonTitle}>
              {branch.id === 0 ? 'TODAS AS FILIAIS' : `${branch.nomeFantasia}`}
            </P>

            <Icon
              name="arrow-forward"
              size={16}
              style={{ marginLeft: 'auto' }}
            />
          </Button>

          <View style={s.link}>
            <View style={[s.linkRow, { marginRight: 2 }]}>
              <LinkCard
                from="PRODUTOS"
                style={{ height: 144, marginBottom: 4 }}
              />

              <LinkCard from="CATEGORIAS" style={{ height: 72 }} />
            </View>

            <View style={[s.linkRow, { marginLeft: 2 }]}>
              <LinkCard from="FILIAIS" style={{ height: 72 }} />

              <LinkCard
                from="MARCAS"
                style={{
                  height: 144,
                  marginTop: 4,
                  borderBottomRightRadius: 24,
                }}
              />
            </View>
          </View>

          {/** <TopThreeProduct topThreeData={topThreeData} /> */}
        </ScrollView>
      </Container>
    </>
  )
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  branchButton: {
    marginBottom: 4,
    marginHorizontal: 18,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 16,
  },
  branchButtonTitle: {
    marginLeft: 10,
    fontFamily: fonts['inter-semibold'],
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: -0.025,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  linkRow: {
    width: (WIDTH - 40) / 2,
  },
})

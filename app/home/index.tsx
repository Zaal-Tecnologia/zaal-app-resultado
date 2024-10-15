import { Link, Stack, useRouter } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { WIDTH } from '~/utils/chart-size'

import { Container } from '~/components/Container'
import { SalesPreview } from '~/components/sales-preview'
import { P } from '~/components/p'
import { Icon } from '~/components/icon'
import { Button } from '~/components/button'

import { User } from './(components)/user'
import { BestSellers } from './(components)/best-sellers'
import { LinkCard } from './(components)/link-card'

import { useBranch } from '~/hooks/use-branch'
import { useTheme } from '~/hooks/use-theme'

import { fonts } from '~/styles/fonts'
import { FilterShow } from '~/components/filter-show'

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
      <Stack.Screen options={{ headerShown: false }} />

      <Container>
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          /** refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            } */
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 24 }}>
          <View style={s.header}>
            <User />

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Link href="/news">
                <Button
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    gap: 4,
                    borderRadius: 99,
                    paddingHorizontal: 16,
                    backgroundColor: '#305a96',
                  }}>
                  <Icon name="chevron-down" color={colors.white} />
                  <P
                    style={{
                      color: colors.white,
                      fontFamily: fonts['urbanist-semibold'],
                      fontSize: 12,
                    }}>
                    Em breve
                  </P>
                </Button>
              </Link>

              <FilterShow />
            </View>
          </View>

          <SalesPreview />

          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 16,
                backgroundColor:
                  theme === 'dark' ? colors.zinc[800] : colors.zinc[100],
                borderRadius: 40,
              }}>
              <Button style={s.branchButton} onPress={() => push('/branches')}>
                <View
                  style={{
                    borderRadius: 99,
                    height: 44,
                    width: 44,
                    backgroundColor:
                      theme === 'dark' ? colors.zinc[700] : colors.zinc[200],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <P style={{ fontFamily: fonts['inter-medium'] }}>
                    {branch.nomeFantasia.slice(0, 2)}
                  </P>
                </View>

                <P style={s.branchButtonTitle}>
                  {branch.id === 0
                    ? 'TODAS AS FILIAIS'
                    : `${branch.nomeFantasia}`}
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
                    style={{
                      borderTopLeftRadius: 24,
                      borderBottomRightRadius: 6,
                    }}
                  />

                  <LinkCard
                    from="CATEGORIAS"
                    style={{
                      borderBottomLeftRadius: 24,
                      borderTopRightRadius: 6,
                    }}
                  />
                </View>

                <View style={[s.linkRow, { marginLeft: 2 }]}>
                  <LinkCard
                    from="FILIAIS"
                    style={{
                      borderTopRightRadius: 24,
                      borderBottomLeftRadius: 6,
                    }}
                  />

                  <LinkCard
                    from="MARCAS"
                    style={{
                      borderBottomRightRadius: 24,
                      borderTopLeftRadius: 6,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <P
            style={{
              fontFamily: 'urbanist-bold',
              fontSize: 24,
              marginLeft: 24,
              marginTop: 32,
              marginBottom: 18,
            }}>
            Mais vendidos
          </P>

          <BestSellers />

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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchButtonTitle: {
    marginLeft: 10,
    fontFamily: fonts['inter-semibold'],
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: -0.025,
  },
  link: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  linkRow: {
    width: (WIDTH - 84) / 2,
  },
})

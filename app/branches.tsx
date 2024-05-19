import { FlatList, TouchableOpacity, View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { zinc } from 'tailwindcss/colors'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

import { Container } from '~/components/Container'
import { Header } from '~/components/header'
import { P } from '~/components/p'

import { api } from '~/api/api'

import { useFetch } from '~/hooks/use-fetch'
import { FAKE_BRANCH_TO_INITIAL_DATA, useBranch } from '~/hooks/use-branch'
import { useTheme } from '~/hooks/use-theme'

import type { BranchResponseDTO } from '~/types/branch-response-dto'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export default function Branches() {
  const { back } = useRouter()
  const { setBranch } = useBranch()

  const { theme } = useTheme()

  const SHIMMER_COLORS =
    theme === 'dark' ? [zinc[700], zinc[800]] : [zinc[100], zinc[200]]

  const { data, isLoading } = useFetch<BranchResponseDTO[]>(
    ['get-branches-query'],
    async (authorization) => {
      const response = await api('filial', {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  )

  return (
    <Container className="pt-6">
      <FlatList
        data={
          data
            ? [FAKE_BRANCH_TO_INITIAL_DATA, ...data]
            : [FAKE_BRANCH_TO_INITIAL_DATA]
        }
        ListHeaderComponent={() => (
          <>
            <Header.Root style={{ paddingHorizontal: 24, marginBottom: 40 }}>
              <Header.Back>SELECIONE UMA FILIAL</Header.Back>
            </Header.Root>

            {isLoading ? (
              <View className="mb-5 flex-row items-center justify-between px-6">
                <View className="flex-row items-center">
                  <ShimmerPlaceholder
                    width={30}
                    height={30}
                    shimmerColors={SHIMMER_COLORS}
                    style={{ borderRadius: 9999, marginRight: 10 }}
                  />

                  <ShimmerPlaceholder
                    width={80}
                    height={14}
                    shimmerColors={SHIMMER_COLORS}
                  />
                </View>
                <ShimmerPlaceholder
                  width={80}
                  height={14}
                  shimmerColors={SHIMMER_COLORS}
                />
              </View>
            ) : null}
          </>
        )}
        keyExtractor={(item) => item.nomeFantasia}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className="mb-5 flex-row items-center justify-between px-6"
            onPress={() => {
              setBranch(item)

              back()
            }}>
            <View className="flex-row items-center">
              <View className="mr-2.5 h-8 min-w-8 items-center justify-center rounded-full bg-zinc-800 px-2">
                <Text className="font-urbanist-medium text-sm -tracking-wide text-white">
                  {item.localId}
                </Text>
              </View>
              <P className="font-inter-medium text-xs uppercase">
                {item.nomeFantasia}
              </P>
            </View>
            <P className="font-urbanist-medium text-sm -tracking-wide text-zinc-500">
              {item.cnpj}
            </P>
          </TouchableOpacity>
        )}
      />
    </Container>
  )
}

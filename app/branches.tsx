import { FlatList, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'

import { Container } from '~/components/Container'
import { Header } from '~/components/header'
import { P } from '~/components/p'
import { Shimmer } from '~/components/shimmer'

import { api } from '~/api/api'

import { useFetch } from '~/hooks/use-fetch'
import { FAKE_BRANCH_TO_INITIAL_DATA, useBranch } from '~/hooks/use-branch'
import { useTheme } from '~/hooks/use-theme'

import { themes } from '~/styles/themes'
import { fonts } from '~/styles/fonts'

import type { BranchResponseDTO } from '~/types/branch-response-dto'

export default function Branches() {
  const { back } = useRouter()
  const { setBranch } = useBranch()

  const { theme } = useTheme()

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
    <Container style={{ paddingTop: 24 }}>
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
              <View
                style={{
                  marginBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 24,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Shimmer
                    width={30}
                    height={30}
                    style={{ borderRadius: 9999, marginRight: 10 }}
                  />

                  <Shimmer width={80} height={14} />
                </View>
                <Shimmer width={80} height={14} />
              </View>
            ) : null}
          </>
        )}
        keyExtractor={(item) => item.nomeFantasia}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
            }}
            onPress={() => {
              setBranch(item)

              back()
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  marginRight: 10,
                  height: 32,
                  maxWidth: 32,
                  width: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 9999,
                  backgroundColor: themes[theme].foreground,
                  paddingHorizontal: 8,
                }}>
                <P
                  style={{
                    fontFamily: fonts['urbanist-medium'],
                    fontSize: 14,
                    letterSpacing: -0.025,
                  }}>
                  {item.localId}
                </P>
              </View>
              <P
                style={{
                  fontFamily: fonts['inter-medium'],
                  fontSize: 12,
                  textTransform: 'uppercase',
                }}>
                {item.nomeFantasia}
              </P>
            </View>
            <P
              style={{
                fontFamily: fonts['urbanist-medium'],
                fontSize: 14,
                letterSpacing: -0.025,
                color: themes[theme].textForeground,
              }}>
              {item.cnpj}
            </P>
          </TouchableOpacity>
        )}
      />
    </Container>
  )
}

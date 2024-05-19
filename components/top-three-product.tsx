import { FlatList, Pressable, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { P } from './p'

type Props = {
  topThreeData: {
    color: string
    localId: string
    posicao: number
    produtoId: number
    produtoNome: string
    quantidadeTotal: number
    value: number
    label: string
  }[]
}

export function TopThreeProduct(props: Props) {
  return props.topThreeData.length > 0 ? (
    <>
      <Pressable className="mb-5 mt-10 flex-row items-center">
        <P className="ml-2.5 font-inter-semibold text-xs">
          TOP <P className="font-urbanist-medium text-xl">3</P> PRODUTOS MAIS
          VENDIDOS
        </P>
      </Pressable>

      <View className="mt-3 w-full flex-row items-center justify-between">
        <FlatList
          data={props.topThreeData}
          keyExtractor={(item) => item.produtoNome}
          ItemSeparatorComponent={() => <View className="my-1.5" />}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="items-center justify-center">
                  <P className="font-urbanist-semibold text-sm -tracking-wide">
                    {item.posicao}°
                  </P>
                </View>

                <Ionicons
                  name="trophy"
                  color={item.color}
                  size={20}
                  style={{ marginHorizontal: 16 }}
                />

                <P
                  className="font-inter-medium text-sm uppercase"
                  numberOfLines={1}>
                  {item.produtoNome}
                </P>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  ) : null
}

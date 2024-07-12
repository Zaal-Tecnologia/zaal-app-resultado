import { Image, StyleSheet, View } from 'react-native'

import { Container } from './Container'
import { Shimmer } from './shimmer'

export function InitialPageLoading() {
  return (
    <Container>
      <View style={s.container}>
        <Image
          alt=""
          source={require('../assets/logo-fundo-preto.png')}
          resizeMode="contain"
          style={s.image}
        />

        <Shimmer width={100} height={16} style={{ marginLeft: 10 }} />
      </View>
    </Container>
  )
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 44,
    width: 44,
  },
})

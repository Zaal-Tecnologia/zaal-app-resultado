import { useRouter } from 'expo-router'
import { Image, View } from 'react-native'
import { Button } from '~/components/button'

import { Container } from '~/components/Container'
import { Icon } from '~/components/icon'
import { P } from '~/components/p'
import { useTheme } from '~/hooks/use-theme'
import { colors } from '~/styles/colors'

import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'

export default function News() {
  const { theme } = useTheme()
  const { back } = useRouter()

  return (
    <Container
      style={{
        padding: 24,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../assets/logo-fundo-preto.png')}
        alt=""
        style={{ width: 100, height: 100 }}
      />

      <P
        style={{
          marginTop: 24,
          fontFamily: fonts['urbanist-regular'],
          fontSize: 44,
          letterSpacing: -0.5,
        }}>
        Temos novidades para você...
      </P>

      <View
        style={{
          paddingVertical: 24,
          backgroundColor: themes[theme].background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}>
          <P
            style={{
              fontSize: 18,
              fontFamily: fonts['urbanist-bold'],
            }}>
            Vendedores
          </P>
          <Icon name="arrow-up" />
        </View>

        <P
          style={{
            fontSize: 13,
            fontFamily: fonts['inter-regular'],
            lineHeight: 20,
            color: colors.zinc[400],
          }}>
          Estamos trabalhando em um módulo completo de vendedores para te
          mostrar os melhores e onde você precisa melhorar.
        </P>
      </View>

      <View
        style={{
          paddingVertical: 24,
          backgroundColor: themes[theme].background,
          borderTopWidth: 1,
          borderColor: themes[theme].border,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <P
            style={{
              fontSize: 18,
              fontFamily: fonts['urbanist-bold'],
            }}>
            Financeiro
          </P>
          <Icon name="arrow-up" />
        </View>

        <P
          style={{
            fontSize: 13,
            fontFamily: fonts['inter-regular'],
            lineHeight: 20,
            color: colors.zinc[400],
          }}>
          Estamos trabalhando em um módulo completo sobre as finanças das suas
          filiais. Isso vai te ajudar a entender onde você precisa melhorar.
        </P>
      </View>

      <Button
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 48,
          width: '100%',
          marginTop: 40,
          gap: 4,
          borderRadius: 99,
          paddingHorizontal: 20,
          backgroundColor: '#305a96',
        }}
        onPress={back}>
        <Icon name="arrow-back" color={colors.white} />
        <P
          style={{
            color: colors.white,
            fontFamily: fonts['urbanist-semibold'],
            fontSize: 13,
          }}>
          Legal, isso vai me ajudar
        </P>
      </Button>
    </Container>
  )
}

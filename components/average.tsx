import { View } from 'react-native'
import { useTheme } from '~/hooks/use-theme'
import { P } from './p'
import { fonts } from '~/styles/fonts'

export function Average({
  smaller,
  bigger,
  average,
}: {
  smaller: string
  bigger: string
  average: string
}) {
  const { BACKGROUND_SECONDARY } = useTheme()

  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 40,
      }}>
      <P
        style={{
          fontFamily: fonts['urbanist-semibold'],
          fontSize: 14,
          letterSpacing: -0.5,
        }}>
        <P style={{ fontFamily: fonts['inter-medium'] }}>máx.</P> {smaller || 0}
      </P>

      <View
        style={{
          backgroundColor: BACKGROUND_SECONDARY,
          marginHorizontal: 20,
          height: 2,
          flex: 1,
        }}
      />

      <P
        style={{
          fontFamily: fonts['urbanist-semibold'],
          fontSize: 14,
          letterSpacing: -0.5,
        }}>
        <P style={{ fontFamily: fonts['inter-medium'] }}>média </P>{' '}
        {average || 0}
      </P>

      <View
        style={{
          backgroundColor: BACKGROUND_SECONDARY,
          marginHorizontal: 20,
          height: 2,
          flex: 1,
        }}
      />

      <P
        style={{
          fontFamily: fonts['urbanist-semibold'],
          fontSize: 14,
          letterSpacing: -0.5,
        }}>
        <P style={{ fontFamily: fonts['inter-medium'] }}>mín.</P> {bigger || 0}
      </P>
    </View>
  )
}

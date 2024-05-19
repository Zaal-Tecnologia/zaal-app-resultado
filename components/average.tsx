import { View } from 'react-native'
import { useTheme } from '~/hooks/use-theme'
import { P } from './p'

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
    <View className="mt-2.5 flex-row items-center px-10">
      <P className="font-urbanist-semibold text-sm -tracking-wider">
        <P className="font-inter-medium">máx.</P> R$ {smaller || 0}
      </P>

      <View
        className="mx-5 h-[2px] flex-1"
        style={{ backgroundColor: BACKGROUND_SECONDARY }}
      />

      <P className="font-urbanist-semibold text-sm -tracking-wider">
        <P className="font-inter-medium">média </P> R$ {average || 0}
      </P>

      <View
        className="mx-5 h-[2px] flex-1"
        style={{ backgroundColor: BACKGROUND_SECONDARY }}
      />

      <P className="font-urbanist-semibold text-sm -tracking-wider">
        <P className="font-inter-medium">mín.</P> R$ {bigger || 0}
      </P>
    </View>
  )
}

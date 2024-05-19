import { useRouter } from 'expo-router'
import { Pressable, TextProps, ViewProps, View } from 'react-native'
import { white, zinc } from 'tailwindcss/colors'

import { useFilter } from '~/hooks/use-filters'

import { Icon } from './icon'
import { P } from './p'
import { ExpandButton } from './expand-button'
import { Size } from './size'

function Root(props: ViewProps) {
  const { filter } = useFilter()

  return (
    <View
      style={[
        {
          borderBottomWidth: filter.EXPAND ? 1 : 0,
          borderColor: filter.EXPAND ? zinc[200] : white,
          marginBottom: !filter.EXPAND ? 20 : 0,
          paddingBottom: filter.EXPAND ? 20 : 0,
          marginTop: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        props.style,
      ]}>
      {props.children}
    </View>
  )
}

function Back(props: TextProps & { onBack?: () => void }) {
  const { back } = useRouter()

  return (
    <Pressable
      onPress={props.onBack || back}
      style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="chevron-back" size={20} />
      <P className="ml-5 font-inter-semibold text-xs uppercase">
        {props.children}
      </P>
    </Pressable>
  )
}

function Content() {
  const { filter } = useFilter()

  return (
    <View className="flex-row items-center" style={{ gap: 8 }}>
      {filter.CHART === 'B. HORIZONTAL' || filter.CHART === 'B. VERTICAL' ? (
        <ExpandButton />
      ) : null}
      <Size />
    </View>
  )
}

export const Header = {
  Root,
  Back,
  Content,
}

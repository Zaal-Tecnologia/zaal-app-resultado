import { useRouter } from 'expo-router'
import { Pressable, TextProps, ViewProps, View } from 'react-native'
import { white, zinc } from 'tailwindcss/colors'

import { useExpand, useFilter } from '~/hooks/use-filters'

import { Icon } from './icon'
import { P } from './p'
import { ExpandButton } from './expand-button'
import { Size } from './size'
import { FilterShow } from './filter'

function Root(props: ViewProps) {
  const { expand } = useExpand()

  return (
    <View
      style={[
        {
          borderBottomWidth: expand ? 1 : 0,
          borderColor: expand ? zinc[200] : white,
          marginBottom: !expand ? 20 : 0,
          paddingBottom: expand ? 20 : 0,
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
      <FilterShow />
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

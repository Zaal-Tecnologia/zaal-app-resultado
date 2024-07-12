import { useRouter } from 'expo-router'
import { Pressable, TextProps, ViewProps, View } from 'react-native'
import { white, zinc } from 'tailwindcss/colors'

import { useChart, useExpand } from '~/hooks/use-filters'

import { Icon } from './icon'
import { P } from './p'
import { ExpandButton } from './expand-button'
import { Size } from './size'
import { FilterShow } from './filter'
import { fonts } from '~/styles/fonts'

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
      <P
        style={{
          marginLeft: 20,
          fontFamily: fonts['inter-semibold'],
          fontSize: 12,
          textTransform: 'uppercase',
        }}>
        {props.children}
      </P>
    </Pressable>
  )
}

function Content() {
  const { chart } = useChart()

  return (
    <View style={{ gap: 8, flexDirection: 'row', alignItems: 'center' }}>
      <FilterShow />
      {chart === 'B. HORIZONTAL' || chart === 'B. VERTICAL' ? (
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

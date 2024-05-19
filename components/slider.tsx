import { View } from 'react-native'

import { P } from './p'

const THUMB_RADIUS_HIGH = 16

export const renderThumb = () => (
  <View
    style={{
      width: THUMB_RADIUS_HIGH * 1.25,
      height: THUMB_RADIUS_HIGH * 1.25,
      borderRadius: THUMB_RADIUS_HIGH,
      borderWidth: 2,
      borderColor: '#305a9620',
      backgroundColor: '#305a96',
    }}
  />
)

export const renderRail = () => (
  <View
    style={{
      flex: 1,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#305a9620',
    }}
  />
)

export const renderRailSelected = () => (
  <View
    style={{
      height: 4,
      backgroundColor: '#305a96',
      borderRadius: 2,
    }}
  />
)

export const renderLabel = (value: number) => (
  <View
    style={{
      alignItems: 'center',
      padding: 8,
      backgroundColor: '#305a96',
      borderRadius: 8,
    }}>
    <P
      style={{
        fontSize: 14,
        color: '#fff',
        fontFamily: 'urbanist-semibold',
      }}>
      {value}
    </P>
  </View>
)

export const renderNotch = () => (
  <View
    style={{
      width: 8,
      height: 8,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: '#305a96',
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderTopWidth: 8,
    }}
  />
)

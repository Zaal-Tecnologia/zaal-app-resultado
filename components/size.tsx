import { Ionicons } from '@expo/vector-icons'
import { Modal, Pressable, Text, View } from 'react-native'
import { useState } from 'react'

import { useSize } from '~/hooks/use-filters'

import { P } from './p'
import { useTheme } from '~/hooks/use-theme'
import { fonts } from '~/styles/fonts'

export function Size() {
  const { setSize, size } = useSize()
  const {
    BORDER_PRIMARY,
    BACKGROUND_PRIMARY,
    BACKGROUND_SECONDARY,
    TEXT_PRIMARY,
  } = useTheme()

  const [open, setOpen] = useState(false)

  return (
    <View>
      <Modal visible={open} transparent>
        <Pressable onPress={() => setOpen(false)} style={{ flex: 1 }}>
          <View
            style={{
              position: 'absolute',
              right: 5,
              top: 0,
              borderRadius: 24,
              backgroundColor: BACKGROUND_PRIMARY,
              padding: 12,
              borderWidth: 1,
              borderColor: BORDER_PRIMARY,
            }}>
            {['5', '10', '20', '30'].map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setOpen((prev) => !prev)
                  setSize(item)
                }}
                style={{
                  height: 48,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 24,
                  paddingHorizontal: 20,
                }}>
                <P
                  style={{
                    fontFamily: fonts['inter-semibold'],
                    fontSize: 14,
                    textTransform: 'uppercase',
                  }}>
                  {item}
                </P>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        style={{
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 9999,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: BORDER_PRIMARY,
          backgroundColor: BACKGROUND_SECONDARY,
        }}>
        <Text
          style={{
            marginRight: 10,
            fontFamily: 'inter-semibold',
            fontSize: 12,
            textTransform: 'uppercase',
            color: TEXT_PRIMARY,
          }}>
          {size}
        </Text>
        <Ionicons name="chevron-down-outline" color="#305a96" size={18} />
      </Pressable>
    </View>
  )
}

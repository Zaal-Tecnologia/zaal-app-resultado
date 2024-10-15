import { useState } from 'react'
import {
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native'

import { Icon } from '~/components/icon'
import { P } from '~/components/p'

import { useTheme } from '~/hooks/use-theme'
import { useUsers } from '~/hooks/use-users'

import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'

export function LogoutOfAllAccounts() {
  const { theme } = useTheme()
  const { onRemoveAllUsers } = useUsers()

  const [visible, setVisible] = useState(false)

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible((prev) => !prev)}
        style={[
          s.sheetButton,
          {
            borderColor: colors.zinc[theme === 'dark' ? 800 : 200],
            borderRightWidth: 1,
          },
        ]}>
        <Icon name="close" color={colors.red[500]} size={20} />
        <P
          style={[
            s.sheetTitle,
            {
              color: colors.red[500],
            },
          ]}>
          Remover todas as contas
        </P>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        style={s.modal}>
        <Pressable
          onPress={() => setVisible(false)}
          style={[
            s.modalOverlay,
            {
              backgroundColor:
                theme === 'dark' ? colors.zinc[900] : colors.white,
            },
          ]}
        />

        <View style={s.modalContent}>
          <View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Icon
                name="alert-circle-outline"
                size={40}
                color={colors.yellow[500]}
              />
              <P
                style={{
                  fontFamily: fonts['inter-medium'],
                  fontSize: 12,
                  letterSpacing: -0.2,
                  color: colors.yellow[500],
                  lineHeight: 20,
                }}>
                Ação não recomendada
              </P>
            </View>

            <P
              style={{
                fontFamily: fonts['urbanist-bold'],
                fontSize: 18,
                letterSpacing: -0.2,
                marginTop: 24,
              }}>
              Tem certeza disso?
            </P>

            <P
              style={{
                fontFamily: fonts['inter-medium'],
                fontSize: 12,
                letterSpacing: -0.2,
                color: colors.zinc[theme === 'dark' ? 400 : 500],
                marginTop: 12,
                lineHeight: 20,
              }}>
              {`Você vai remover todas as contas ativas e inativas no smartphone.
              
Fazendo isso você vai precisar refazer todos os passos de login novamente.`}
            </P>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 24,
                gap: 10,
              }}>
              <Pressable
                onPress={() => setVisible(false)}
                style={{
                  height: 44,
                  backgroundColor: '#305a96',
                  borderRadius: 99,
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <View
                  style={{
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    position: 'absolute',
                    left: 0,
                  }}>
                  <Icon name="chevron-back" size={16} color={colors.white} />
                </View>

                <P
                  style={{
                    fontFamily: fonts['urbanist-bold'],
                    fontSize: 13,
                    letterSpacing: -0.45,
                    color: colors.white,
                  }}>
                  Não, voltar
                </P>
              </Pressable>

              <Pressable
                onPress={onRemoveAllUsers}
                style={{
                  height: 44,
                  backgroundColor: colors.red[500],
                  borderRadius: 99,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <View
                  style={{
                    height: 44,
                    width: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: 0,
                  }}>
                  <Icon name="close" size={16} color={colors.white} />
                </View>
                <P
                  style={{
                    fontFamily: fonts['urbanist-bold'],
                    fontSize: 13,
                    letterSpacing: -0.45,
                    color: colors.white,
                  }}>
                  Sim
                </P>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const s = StyleSheet.create({
  sheetButton: {
    borderBottomWidth: 1,
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    marginLeft: 12,
    fontFamily: fonts['inter-semibold'],
    fontSize: 12,
    letterSpacing: -0.35,
  },
  modal: { position: 'relative' },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    opacity: 0.9,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    borderRadius: 4,
  },
})

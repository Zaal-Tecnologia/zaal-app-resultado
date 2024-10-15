import { useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { white } from 'tailwindcss/colors'
import { useRouter } from 'expo-router'
import { CameraView, useCameraPermissions } from 'expo-camera'

import { P } from '~/components/p'
import { useToast } from 'react-native-toast-notifications'
import { fonts } from '~/styles/fonts'

export default function AuthWithQRCode() {
  const [permission, requestPermission] = useCameraPermissions()

  const { push } = useRouter()
  const toast = useToast()

  const onBarcodeScanned = useCallback(
    ({ data }: { data: string }) => {
      try {
        const content = JSON.parse(data) as {
          dispositivoHash: string
          empresaId: string
        }

        if (
          // eslint-disable-next-line no-prototype-builtins
          !content.hasOwnProperty('empresaId') ||
          // eslint-disable-next-line no-prototype-builtins
          !content.hasOwnProperty('dispositivoHash')
        ) {
          if (!toast.isOpen('object-error')) {
            toast.show(
              'Esse QR Code não contém as informações corretas para preencher os campos.',
              {
                id: 'object-error',
                onPress() {
                  push(`/auth-with-text/nothing`)
                },
              },
            )
          }
        } else {
          push(
            `/auth-with-text/${content.dispositivoHash}/${content.empresaId}`,
          )
        }
      } catch (error) {
        if (!toast.isOpen('error')) {
          toast.show('Não foi possível ler o QR Code, clique aqui.', {
            id: 'error',
            onPress() {
              push(`/auth-with-text/nothing`)
            },
          })
        }
      }
    },
    [push, toast],
  )

  useEffect(() => {
    if (!permission?.granted) requestPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission?.granted])

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={({ data }) => onBarcodeScanned({ data })}>
        <View style={styles.buttonContainer}>
          <P style={styles.title}>
            Use a câmera para escanear o código de barras
          </P>

          <View
            style={{
              // borderWidth: 1,
              // borderColor: '#FFF',
              height: 250,
              width: 250,
              position: 'relative',
            }}>
            <View
              style={{
                position: 'absolute',
                top: -1,
                left: 0,
                width: 50,
                height: 8,
                backgroundColor: white,
                zIndex: 50,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: -1,
                left: 0,
                width: 8,
                height: 50,
                backgroundColor: white,
                zIndex: 50,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 0,
                width: 50,
                height: 8,
                backgroundColor: white,
                zIndex: 50,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: 0,
                width: 8,
                height: 50,
                backgroundColor: white,
                zIndex: 50,
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: -1,
                left: 0,
                width: 50,
                height: 8,
                backgroundColor: white,
                zIndex: 50,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: -1,
                left: 0,
                width: 8,
                height: 50,
                backgroundColor: white,
                zIndex: 50,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: -1,
                right: 0,
                width: 50,
                height: 8,
                backgroundColor: white,
                zIndex: 50,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: -1,
                right: 0,
                width: 8,
                height: 50,
                backgroundColor: white,
                zIndex: 50,
              }}
            />
          </View>
        </View>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    color: '#FFF',
    marginBottom: 80,
    fontFamily: fonts['inter-medium'],
    textAlign: 'center',
  },
})

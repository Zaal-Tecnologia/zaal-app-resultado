import { useCallback, useEffect } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { white } from 'tailwindcss/colors'
import { useRouter } from 'expo-router'
import { CameraView, useCameraPermissions } from 'expo-camera/next'

import { P } from '~/components/p'

export default function AuthWithQRCode() {
  const [permission, requestPermission] = useCameraPermissions()

  const { push } = useRouter()

  const onBarcodeScanned = useCallback(
    ({ data }: { data: string }) => {
      // setQRCodeResult({ dispositivoHash: data, empresaId: data })

      push(`/auth-with-text/dispositvoHash/empresaId`)
    },
    [push],
  )

  useEffect(() => {
    if (!permission?.granted) requestPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission?.granted])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={({ data }) => onBarcodeScanned({ data })}>
        <View style={styles.buttonContainer}>
          <P
            style={{ color: '#FFF' }}
            className="mb-20 text-center font-inter-medium">
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
})

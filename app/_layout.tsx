import '../global.css'

import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ToastProvider } from 'react-native-toast-notifications'
import { white, zinc } from 'tailwindcss/colors'
import { useMMKVString } from 'react-native-mmkv'
import { StatusBar } from 'expo-status-bar'

import { queryClient } from '~/api/client'

import { Container } from '~/components/Container'
import { InitialPageLoading } from '~/components/initial-page-loading'

export default function Layout() {
  const [theme] = useMMKVString('zaal-result-theme', undefined)

  const [fontsLoaded] = useFonts({
    'urbanist-regular': require('../assets/fonts/urbanist/Urbanist-Regular.ttf'),
    'urbanist-medium': require('../assets/fonts/urbanist/Urbanist-Medium.ttf'),
    'urbanist-semibold': require('../assets/fonts/urbanist/Urbanist-SemiBold.ttf'),
    'urbanist-bold': require('../assets/fonts/urbanist/Urbanist-Bold.ttf'),
    'inter-regular': require('../assets/fonts/inter/Inter-Regular.ttf'),
    'inter-medium': require('../assets/fonts/inter/Inter-Medium.ttf'),
    'inter-semibold': require('../assets/fonts/inter/Inter-SemiBold.ttf'),
  })

  if (!fontsLoaded) {
    return (
      <Container className="p-6">
        <InitialPageLoading />
      </Container>
    )
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme === 'dark' ? zinc[900] : white,
      }}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: theme === 'dark' ? zinc[900] : white,
              },
            }}
          />
        </ToastProvider>
      </QueryClientProvider>

      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </GestureHandlerRootView>
  )
}

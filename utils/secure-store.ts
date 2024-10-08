import * as SecureStore from 'expo-secure-store'

export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

export async function getToken(key: string) {
  const result = await SecureStore.getItemAsync(key)

  return result
}

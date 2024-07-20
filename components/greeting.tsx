import { Text } from 'react-native'

import { useTheme } from '~/hooks/use-theme'
import { fonts } from '~/styles/fonts'

import { themes } from '~/styles/themes'

export function Greeting() {
  const { theme } = useTheme()

  const hour = new Date().getHours()
  console.log(hour)

  let message = ''

  if (hour >= 3 && hour <= 12) message = 'Bom dia'
  if (hour > 12 && hour <= 18) message = 'Boa tarde'
  if (hour > 18) message = 'Boa noite'

  return (
    <Text
      style={{
        color: themes[theme].textForeground,
        fontSize: 12,
        fontFamily: fonts['inter-medium'],
      }}>
      {message},
    </Text>
  )
}

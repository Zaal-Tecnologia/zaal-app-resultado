import { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'

export function Button({
  children,
  style,
  ...props
}: ComponentProps<typeof TouchableOpacity>) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={style} {...props}>
      {children}
    </TouchableOpacity>
  )
}

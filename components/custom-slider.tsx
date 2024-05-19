import { RangeSlider } from '@react-native-assets/slider'
import { ComponentProps } from 'react'

export function CustomSlider(props: ComponentProps<typeof RangeSlider>) {
  return (
    <RangeSlider
      {...props}
      minimumValue={0}
      step={1}
      minimumRange={2}
      outboundColor="#305a9620"
      inboundColor="#305a96"
      thumbTintColor="#305a96"
      trackHeight={2}
      thumbSize={18}
    />
  )
}

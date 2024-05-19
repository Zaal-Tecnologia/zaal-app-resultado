import { ComponentProps } from 'react'
import { Pie, PolarChart } from 'victory-native'

type Data = {
  color: string
  value: number
  label: string
}

type Props = Omit<ComponentProps<typeof PolarChart>, 'data'> & {
  data: Data[] | []
}

export function PieChart(props: Props) {
  return (
    <PolarChart
      {...props}
      data={props.data}
      labelKey={'label' as never}
      valueKey={'value' as never}
      colorKey={'color' as never}>
      <Pie.Chart innerRadius={40} />
    </PolarChart>
  )
}

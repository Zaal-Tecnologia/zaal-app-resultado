import { memo } from 'react'

import { Chart } from './chart'

import { useChart } from '~/hooks/use-filters'

import { WIDTH } from '~/utils/chart-size'

type Props =
  | {
      id: number
      posicao: string
      color: string
      percentage: string
      localId: string
      quantidadeTotal: number
      valorTotal: number
    }
  | { [key: string]: string }

function UnmemoizedChart<Props>(props: { data: Props[] }) {
  const { chart } = useChart()

  const CHART_COMPONENT = {
    ROSCA: <Chart.Pie data={props.data} innerRadius={(WIDTH * 0.7) / 2.5} />,
    PIZZA: <Chart.Pie data={props.data} innerRadius={0} />,
    'B. HORIZONTAL': <Chart.Bar data={props.data} horizontal />,
    'B. VERTICAL': <Chart.Bar data={props.data} />,
  }

  return CHART_COMPONENT[chart!]
}

export const SelectedChart = memo(UnmemoizedChart)

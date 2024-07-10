import { memo } from 'react'

import { Chart } from './chart'

import { useChart } from '~/hooks/use-filters'

import { CHART_SIZE } from '~/utils/chart-size'

function UnmemoizedChart(props: { data: any }) {
  const { chart } = useChart()

  const CHART_COMPONENT = {
    ROSCA: <Chart.Pie data={props.data} innerRadius={CHART_SIZE / 2.5} />,
    PIZZA: <Chart.Pie data={props.data} innerRadius={0} />,
    'B. HORIZONTAL': <Chart.Bar data={props.data} horizontal />,
    'B. VERTICAL': <Chart.Bar data={props.data} />,
  }

  return CHART_COMPONENT[chart!]
}

export const SelectedChart = memo(UnmemoizedChart)

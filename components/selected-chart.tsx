import { memo } from 'react'

import { useChart } from '~/hooks/use-filters'
import { Chart } from './chart'
import { CHART_SIZE } from '~/utils/chart-size'

function UnmemoizedChart() {
  const { chart } = useChart()

  const CHART_COMPONENT = {
    ROSCA: <Chart.Pie data={chartData} innerRadius={CHART_SIZE / 2.5} />,
    PIZZA: <Chart.Pie data={chartData} innerRadius={0} />,
    'B. HORIZONTAL': <Chart.Bar data={chartData} horizontal />,
    'B. VERTICAL': <Chart.Bar data={chartData} />,
  }

  return CHART_COMPONENT[chart!]
}

export const SelectedChart = memo(UnmemoizedChart)

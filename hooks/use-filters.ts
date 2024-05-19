import { create } from 'zustand'

type Period = 'DIA' | 'MÊS' | 'SEMANA'
type Variant = 'VALOR' | 'QUANTIDADE'
type Chart = 'ROSCA' | 'PIZZA' | 'B. VERTICAL' | 'B. HORIZONTAL'

type Filter = {
  PERIOD?: Period
  VARIANT?: Variant
  CHART?: Chart
  SHOW?: boolean
  EXPAND?: boolean
  SIZE?: string
}

const DEFAULT_FILTER_VALUES: Filter = {
  PERIOD: 'MÊS',
  VARIANT: 'VALOR',
  CHART: 'B. VERTICAL',
  SHOW: true,
  EXPAND: false,
  SIZE: '20',
}

type Props = {
  setFilter(value: Filter): void
  filter: Filter
}

export const useFilter = create<Props>((set) => ({
  filter: DEFAULT_FILTER_VALUES,
  setFilter: (filter) =>
    set((prev) => {
      return {
        filter: {
          PERIOD: filter.PERIOD || prev.filter.PERIOD,
          VARIANT: filter.VARIANT || prev.filter.VARIANT,
          CHART: filter.CHART || prev.filter.CHART,
          SHOW: !prev.filter.SHOW,
          EXPAND: filter.EXPAND,
          SIZE: filter.SIZE || prev.filter.SIZE,
        },
      }
    }),
}))

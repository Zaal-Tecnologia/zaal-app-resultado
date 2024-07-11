import { create } from 'zustand'

type Period = 'DIA' | 'MÊS' | 'SEMANA'
type Variant = 'VLR' | 'QNT'
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
  VARIANT: 'VLR',
  CHART: 'B. VERTICAL',
  SHOW: true,
  EXPAND: false,
  SIZE: '20',
}

interface IShow {
  setShow(show: boolean): void
  show: boolean
}

export const useShow = create<IShow>((set) => ({
  show: DEFAULT_FILTER_VALUES.SHOW!,
  setShow: (show) =>
    set(() => {
      return { show }
    }),
}))

interface IExpand {
  setExpand(expand: boolean): void
  expand: boolean
}

export const useExpand = create<IExpand>((set) => ({
  expand: DEFAULT_FILTER_VALUES.EXPAND!,
  setExpand: (expand) =>
    set(() => {
      return { expand }
    }),
}))

interface ISize {
  setSize(size: string): void
  size: string
}

export const useSize = create<ISize>((set) => ({
  size: DEFAULT_FILTER_VALUES.SIZE!,
  setSize: (size) =>
    set(() => {
      return { size }
    }),
}))

interface IPeriod {
  setPeriod(period: Period): void
  period: Period
}

export const usePeriod = create<IPeriod>((set) => ({
  period: DEFAULT_FILTER_VALUES.PERIOD!,
  setPeriod: (period) =>
    set(() => {
      return { period }
    }),
}))

interface IVariant {
  setVariant(variant: Variant): void
  variant: Variant
}

export const useVariant = create<IVariant>((set) => ({
  variant: DEFAULT_FILTER_VALUES.VARIANT!,
  setVariant: (variant) =>
    set(() => {
      return { variant }
    }),
}))

interface IChart {
  setChart(chart: Chart): void
  chart: Chart
}

export const useChart = create<IChart>((set) => ({
  chart: DEFAULT_FILTER_VALUES.CHART!,
  setChart: (chart) =>
    set(() => {
      return { chart }
    }),
}))

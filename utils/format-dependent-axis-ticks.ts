import { currency } from './currency'

export function formatDependentAxisTicks(tick: number) {
  return currency(tick >= 1000 ? tick / 1000 : tick)
    .concat(tick >= 1000 ? 'k' : '')
    .replace(',00', '')
}

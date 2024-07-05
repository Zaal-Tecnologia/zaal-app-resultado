import { currency } from './currency'

export function renderTheLabelAboveTheBar(amount: number) {
  return amount >= 1000
    ? ` ${currency(amount / 1000)} K`.replace(',', '.')
    : ` ${currency(amount)}`
}

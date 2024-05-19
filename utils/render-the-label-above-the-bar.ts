import { currency } from './currency'

export function renderTheLabelAboveTheBar(amount: number) {
  return amount >= 1000
    ? `R$ ${currency(amount / 1000)} K`.replace(',', '.')
    : `R$ ${currency(amount)}`
}

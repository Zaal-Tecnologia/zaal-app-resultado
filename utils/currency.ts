export function currency(value: number | undefined) {
  return !value
    ? '0'
    : new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        maximumSignificantDigits: 2,
        minimumFractionDigits: 2,
      }).format(value)
}

export function currency(value: number | undefined) {
  return !value
    ? '0'
    : new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        minimumFractionDigits: 2,
        style: 'currency',
      }).format(value)
}

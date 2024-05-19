export type TotalSalesResponseDTO = {
  diaCorrente: { indice: number; quantidadeTotal: number; valorTotal: number }[]
  mesCorrente: { indice: number; quantidadeTotal: number; valorTotal: number }[]
  semanaCorrente: {
    indice: number
    quantidadeTotal: number
    valorTotal: number
  }[]
}

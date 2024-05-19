export function api(path: string, init?: RequestInit) {
  const baseURL = new URL(path, 'https://api.resultadovenda.zaal.com.br/')

  return fetch(baseURL, init)
}

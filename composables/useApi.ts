export function useApi() {
  const token = useCookie('auth_token')

  return $fetch.create({
    baseURL: '/api',
    onRequest({ options }) {
      const headers = new Headers(options.headers)
      if (token.value) {
        headers.set('authorization', `Bearer ${token.value}`)
        options.headers = headers
      }
    },
    onResponseError({ error }) {
      console.error('Проблема: ', error)
    },
    onRequestError({ error }) {
      console.error('Сеть недоступна', error)
    },
  })
}

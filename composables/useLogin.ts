export function useLogin() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)

  
  const login = async (params: { email: string, password: string }) => {
    try {
      isFetching.value = true
      error.value = null

      const body = {
        email: params.email,
        password:params.password
      }

      const res = await api<{token:string}>('/auth', {
      method:'POST',
      body,
    })
    
    isFetching.value = false
    const token = useCookie('auth_token')
    token.value = res.token
    
    return {success:true,data:res}
    } catch (e:any) {
      error.value = e.response?._data?.message || 'Ошибка авторизации'
      return { success: false, error: error.value }
    }
    finally {
    isFetching.value = false
  }
  }
  return {login,isFetching}
}
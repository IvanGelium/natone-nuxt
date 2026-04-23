import type { User, UserDTO } from '@/types/index'
import { UserMapper } from '~/types/mapper'

export function useAuth() {
  const api = useApi()
  const user = useState<User | null>('auth_user', () => null)
  const isLoaded = computed(() => !!user.value)

  const fetchMe = async () => {
    if (user.value)
      return user.value

    try {
      const res = await api<UserDTO>('/me')
      user.value = UserMapper.toEntity(res)
      return user.value
    }
    catch (e) {
      user.value = null
      throw e
    }
  }

  const logout = () => {
    const token = useCookie('auth_token')
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  return {
    user: readonly(user),
    isLoaded,
    fetchMe,
    logout,
  }
}

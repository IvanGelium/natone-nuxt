export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('auth_token')
  const { user, fetchMe } = useAuth()
  if (token.value && !user.value) {
    try {
      await fetchMe()
    } catch {
      token.value = null
      return navigateTo('/login')
    }
  }

  if (token.value && (to.path == '/login' || to.path == '/signup')) {
    return navigateTo('/')
  }
})
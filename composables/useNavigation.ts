import type { Navigation, NavigationDTO } from '@/types/index'
import { NavigationMapper } from '~/types/mapper'

export function useGetNavigation() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Navigation | null>(null)

  const getNavigation = async () => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<NavigationDTO>(`/navigation`, {
        method: 'GET',
      })
      data.value = NavigationMapper.toEntity(res || null)

      return { success: true, data: data.value, error: null, isFetching }
    }
    catch (e: any) {
      console.error(e)
      return { success: false, data: null, error: e, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }
  return getNavigation
}

export function useSetNavigationOrderByNumber() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const setNavigationOrderByNumber = async (body: { id: number }, entityName: string) => {
    try {
      isFetching.value = true
      error.value = null
      const res = await api<NavigationDTO>(`/navigation/${entityName}`, {
        method: 'POST',
        body,
      })

      return { success: true, data: res, error: null, isFetching }
    }
    catch (e: any) {
      console.error(e)
      return { success: false, data: null, error: e, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }
}

export function useSetNavigationOrder() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  // const data = ref<Navigation | null>(null)

  const setNavigationOrder = async (body: { id: number, orderIndex: number }[], entityName: string) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<NavigationDTO>(`/navigation/${entityName}`, {
        method: 'POST',
        body,
      })
      // data.value = NavigationMapper.toEntity(res || null)

      return { success: true, data: res, error: null, isFetching }
    }
    catch (e: any) {
      console.error(e)
      return { success: false, data: null, error: e, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }

  return setNavigationOrder
}

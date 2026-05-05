import type { Conspect, ConspectDTO } from '@/types/index'
import { ConspectMapper } from '~/types/mapper'

export function useGetConspect() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Conspect | null>(null)

  const getConspect = async (conspectId: number) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<ConspectDTO>(`/conspects/${conspectId}`, {
        method: 'GET',
      })
      data.value = ConspectMapper.toEntity(res)

      return { success: true, data, error: null, isFetching }
    }
    catch (e: any) {
      console.error(e)
      error.value = e.response?._data?.message || 'Неизвестная ошибка'
      return { success: false, data: null, error: e, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }
  return getConspect
}

export function useCreateConspect() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Conspect | null>(null)

  const createConspect = async (bodyDomain: Partial<Conspect>) => {
    try {
      const body = ConspectMapper.toDto(bodyDomain)
      isFetching.value = true
      error.value = null

      const res = await api<ConspectDTO>(`/conspects`, {
        method: 'POST',
        body,
      })

      data.value = ConspectMapper.toEntity(res)

      return { success: true, data: data.value, isFetching }
    }
    catch (e: any) {
      error.value = e.response?._data?.message || 'Неизвестная ошибка'
      return { success: false, data: error.value, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }
  return createConspect
}

export function useUpdateConspect() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Conspect | null>(null)

  const updateConspect = async (conspectId: number, bodyDomain: Partial<Conspect>) => {
    try {
      const body = ConspectMapper.toDto(bodyDomain)
      isFetching.value = true
      error.value = null
      const res = await api<ConspectDTO>(`/conspects/${conspectId}`, {
        method: 'PATCH',
        body,
      })

      data.value = ConspectMapper.toEntity(res)

      return { success: true, data: data.value, isFetching }
    }
    catch (e: any) {
      console.error(e)
      error.value = e.response?._data?.message || 'Неизвестная ошибка'
      return { success: false, data: error.value, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }
  return updateConspect
}

export function useDeleteConspect() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Conspect | null>(null)

  const deleteConspect = async (conspectId: number) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<ConspectDTO>(`/conspects/${conspectId}`, {
        method: 'DELETE',
      })

      data.value = ConspectMapper.toEntity(res)

      return { success: true, data: data.value, isFetching }
    }
    catch (e: any) {
      error.value = e.response?._data?.message || 'Неизвестная ошибка'
      return { success: false, data: error.value, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }
  return deleteConspect
}

import type { Practice, PracticeDTO, ShortPractice, ShortPracticeDTO } from '@/types/index'
import { PracticeMapper } from '~/types/mapper'

export function useGetPractice() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Practice | null>(null)

  const getPractice = async (practiceId: number) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<PracticeDTO>(`/practicies/${practiceId}`, {
        method: 'GET',
      })
      data.value = PracticeMapper.toEntity(res)

      return { success: true, data, error: null, isFetching }
    }
    catch (e: any) {
      error.value = e.response?._data?.message || 'Неизвестная ошибка'
      return { success: false, data: null, error: e, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }
  return getPractice
}

export function useGetPracticiesIds() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<ShortPractice[] | null>(null)

  const getPracticiesIds = async () => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<ShortPracticeDTO[]>(`/practicies`, {
        method: 'GET',
      })
      data.value = res.map(e => PracticeMapper.toEntityShort(e))

      return { success: true, data, error: null, isFetching }
    }
    catch (e: any) {
      error.value = e.response?._data?.message || 'Неизвестная ошибка'
      return { success: false, data: null, error: e, isFetching }
    }
    finally {
      isFetching.value = false
    }
  }
  return getPracticiesIds
}

export function useCreatePractice() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Practice | null>(null)

  const createPractice = async (bodyDomain: Partial<Practice>) => {
    try {
      const body = PracticeMapper.toDto(bodyDomain)
      isFetching.value = true
      error.value = null

      const res = await api<PracticeDTO>(`/practicies`, {
        method: 'POST',
        body,
      })

      data.value = PracticeMapper.toEntity(res)

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
  return createPractice
}

export function useUpdatePractice() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Practice | null>(null)

  const updatePractice = async (practiceId: number, bodyDomain: Practice) => {
    try {
      const body = PracticeMapper.toDto(bodyDomain)
      isFetching.value = true
      error.value = null

      const res = await api<PracticeDTO>(`/practicies/${practiceId}`, {
        method: 'PATCH',
        body,
      })

      data.value = PracticeMapper.toEntity(res)

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
  return updatePractice
}

export function useDeletePractice() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Practice | null>(null)

  const deletePractice = async (practiceId: number) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<PracticeDTO>(`/practicies/${practiceId}`, {
        method: 'DELETE',
      })

      data.value = PracticeMapper.toEntity(res)

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
  return deletePractice
}

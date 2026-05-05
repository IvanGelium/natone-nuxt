import type { ShortStage, ShortStageDTO, Stage, StageDTO } from '@/types/index'
import { NavigationMapper, StageMapper } from '~/types/mapper'

export function useGetStage() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Stage | null>(null)

  const getStage = async (stageId: number) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<StageDTO>(`/stages/${stageId}`, {
        method: 'GET',
      })
      data.value = StageMapper.toEntity(res)

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
  return getStage
}
export function useGetStagesIds() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<ShortStage[] | null>(null)

  const getStagesIds = async () => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<ShortStageDTO[]>(`/stages`, {
        method: 'GET',
      })
      data.value = res.map(e => NavigationMapper.dtoToStage(e))

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
  return getStagesIds
}

export function useCreateStage() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Stage | null>(null)

  const createStage = async (bodyDomain: Partial<Stage>) => {
    try {
      const body = StageMapper.toDto(bodyDomain)
      isFetching.value = true
      error.value = null

      const res = await api<StageDTO>(`/stages`, {
        method: 'POST',
        body,
      })

      data.value = StageMapper.toEntity(res)

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
  return createStage
}

export function useUpdateStage() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Stage | null>(null)

  const updateStage = async (stageId: number, bodyDomain: Partial<Stage>) => {
    try {
      const body = StageMapper.toDto(bodyDomain)
      isFetching.value = true
      error.value = null

      const res = await api<StageDTO>(`/stages/${stageId}`, {
        method: 'PATCH',
        body,
      })

      data.value = StageMapper.toEntity(res)

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
  return updateStage
}

export function useDeleteStage() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Stage | null>(null)

  const deleteStage = async (stageId: number) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<StageDTO>(`/stages/${stageId}`, {
        method: 'DELETE',
      })

      data.value = StageMapper.toEntity(res)

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
  return deleteStage
}

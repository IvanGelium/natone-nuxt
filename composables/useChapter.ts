import type { Chapter, ChapterDTO, ShortChapter, ShortChapterDTO } from '@/types/index'
import { ChapterMapper, NavigationMapper } from '~/types/mapper'

export function useGetChapter() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Chapter | null>(null)

  const getChapter = async (chapterId: number) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<ChapterDTO>(`/chapters/${chapterId}`, {
        method: 'GET',
      })
      data.value = ChapterMapper.toEntity(res)

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
  return getChapter
}

export function useGetChaptersIds() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<ShortChapter[] | null>(null)

  const getChaptersIds = async () => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<ShortChapterDTO[]>(`/chapters`, {
        method: 'GET',
      })
      data.value = res.map(e => NavigationMapper.dtoToChapter(e))
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
  return getChaptersIds
}

export function useCreateChapter() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Chapter | null>(null)

  const createChapter = async (bodyDomain: Partial<Chapter>) => {
    try {
      const body = ChapterMapper.toDto(bodyDomain)
      isFetching.value = true
      error.value = null

      const res = await api<ChapterDTO>(`/chapters`, {
        method: 'POST',
        body,
      })

      data.value = ChapterMapper.toEntity(res)

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
  return createChapter
}

export function useUpdateChapter() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Chapter | null>(null)

  const updateChapter = async (chapterId: number, bodyDomain: Partial<Chapter>) => {
    try {
      const body = ChapterMapper.toDto(bodyDomain)
      isFetching.value = true
      error.value = null

      const res = await api<ChapterDTO>(`/chapters/${chapterId}`, {
        method: 'PATCH',
        body,
      })

      data.value = ChapterMapper.toEntity(res)

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
  return updateChapter
}

export function useDeleteChapter() {
  const api = useApi()
  const isFetching = ref(false)
  const error = ref<string | null>(null)
  const data = ref<Chapter | null>(null)

  const deleteChapter = async (chapterId: number) => {
    try {
      isFetching.value = true
      error.value = null

      const res = await api<ChapterDTO>(`/chapters/${chapterId}`, {
        method: 'DELETE',
      })

      data.value = ChapterMapper.toEntity(res)

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
  return deleteChapter
}

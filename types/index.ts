import type { userRole } from "~/types/utils"

export interface StageDTO  { 
  id: string
  title: string
  chapters?: ChapterDTO[]
  createdAt: string
  updatedAt: string    
}


export interface Stage  { 
  id: number
  title: string
  chapters?: Chapter[]
  createdAt: Date
  updatedAt: Date    
}

export interface ChapterDTO {
  id: string
  title: String
  stageId?: string
  conspects?: ConspectDTO[]
  createdAt: string
  updatedAt: string
}
export interface Chapter {
  id: number
  title: String
  stageId?: number
  conspects?: Conspect[]
  createdAt: Date
  updatedAt: Date
}

export interface ConspectDTO {
  id: string
  title: string
  practiceId?: string
  chapterId?: string
  body: string
  createdAt: string
  updatedAt: string
}

export interface Conspect {
  id: number
  title: string
  chapterId?: number
  practiceId?: number
  body: string
  createdAt: Date
  updatedAt: Date
}

export interface PracticeDTO {
  id: string
  title: string
  conspectId?: string
  conspect?: ConspectDTO[]
}
export interface Practice {
  id: number
  title: string
  conspectId?: number
  conspect?: Conspect[]
}

export interface UserDTO { 
  id:string
  name?: string                           
  email: string
  role: string
  createdAt: string
  updatedAt: string    
  deletedAt?: string | null 
  isActive: boolean
}

export interface User { 
  id:number
  name?: string                           
  email: string
  role: userRole
  createdAt: Date
  updatedAt: Date    
  deletedAt?: Date  | null
  isActive: boolean
}

export interface ShortConspectDTO { 
  id: string
  title: string
}
export interface ShortConspect { 
  id: number
  title: string
}

export interface ShortChapterDTO { 
  id: string
  title: string
  conspects: ShortConspectDTO[]
}
export interface ShortChapter { 
  id: number
  title: string
  conspects: ShortConspect[]
}

export interface ShortStageDTO {
  id: string
  title: string
  chapters: ShortChapterDTO[]
} 
export interface ShortStage {
  id: number
  title: string
  chapters: ShortChapter[]
} 

export interface NavigationDTO {
  stages: ShortStageDTO[]
}
export interface Navigation {
  stages: ShortStage[]
}


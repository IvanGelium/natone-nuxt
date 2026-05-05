import type {
  Chapter,
  ChapterDTO,
  Conspect,
  ConspectDTO,
  Navigation,
  NavigationDTO,
  Practice,
  PracticeDTO,
  ShortChapter,
  ShortChapterDTO,
  ShortConspect,
  ShortConspectDTO,
  ShortPractice,
  ShortPracticeDTO,
  ShortStage,
  ShortStageDTO,
  Stage,
  StageDTO,
  User,
  UserDTO,
} from '~/types'
import type { userRole } from '~/types/utils'

export const UserMapper = {
  toEntity(dto: UserDTO): User {
    return {
      id: Number(dto.id),
      email: dto.email,
      name: dto.name || '',
      role: dto.role.toLowerCase() as userRole,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      deletedAt: dto.deletedAt ? new Date(dto.deletedAt) : null,
      isActive: dto.isActive,
    }
  },
  toDto(entity: Partial<User>): Partial<UserDTO> {
    return {
      id: String(entity.id),
      email: entity.email || '',
      name: entity.name,
      role: entity.role?.toUpperCase() || 'GUEST',
      isActive: entity.isActive || false,
    }
  },
}

export const NavigationMapper = {
  dtoToConspect(dto: ShortConspectDTO): ShortConspect {
    return {
      id: Number(dto.id),
      title: dto.title,
    }
  },

  dtoToChapter(dto: ShortChapterDTO): ShortChapter {
    return {
      id: Number(dto.id),
      title: dto.title,
      conspects: dto.conspects?.map(NavigationMapper.dtoToConspect) || [],
    }
  },

  dtoToStage(dto: ShortStageDTO): ShortStage {
    return {
      id: Number(dto.id),
      title: dto.title,
      chapters: dto.chapters?.map(NavigationMapper.dtoToChapter),
    }
  },
  toEntity(dto: NavigationDTO): Navigation {
    return {
      stages: dto.stages.map(NavigationMapper.dtoToStage),
    }
  },
}

export const PracticeMapper = {
  toEntity(dto: PracticeDTO): Practice {
    return {
      ...dto,
      id: Number(dto.id),
      conspectId: Number(dto.conspectId),
      // conspect: dto.conspect ? dto.conspect.map(ConspectMapper.toEntity) : [],
    }
  },
  toDto(entity: Partial<Practice>): Partial<PracticeDTO> {
    const dto: Partial<PracticeDTO> = {
      title: entity.title || '',
    }
    if (entity.id)
      dto.id = String(entity.id)
    if (entity.conspectId)
      dto.conspectId = String(entity.conspectId)

    return dto
  },

  toEntityShort(dto: ShortPracticeDTO): ShortPractice {
    return {
      id: Number(dto.id),
      title: dto.title,
    }
  },
}

export const ConspectMapper = {
  toEntity(dto: ConspectDTO): Conspect {
    const entity: Conspect = {
      id: Number(dto.id),
      chapterId: Number(dto.chapterId),
      title: dto.title,
      body: dto.body,
      practiceId: Number(dto.practiceId),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    }
    if (dto.practice)
      entity.practice = PracticeMapper.toEntityShort(dto.practice)

    return entity
  },

  toDto(entity: Partial<Conspect>): Partial<ConspectDTO> {
    const dto: Partial<ConspectDTO> = {
      title: entity.title || '',
      body: entity.body || '',
    }

    if (entity.id)
      dto.id = String(entity.id)
    if (entity.chapterId)
      dto.chapterId = String(entity.chapterId)
    if (entity.practiceId)
      dto.practiceId = String(entity.practiceId)
    return dto
  },
}

export const ChapterMapper = {
  toEntity(dto: ChapterDTO): Chapter {
    return {
      ...dto,
      id: Number(dto.id),
      stageId: Number(dto.stageId),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      conspects: dto.conspects?.map(ConspectMapper.toEntity) || [],
    }
  },

  toDto(entity: Partial<Chapter>): Partial<ChapterDTO> {
    const dto: Partial<ChapterDTO> = {
      title: entity.title || '',
    }
    if (entity.stageId)
      dto.stageId = String(entity.stageId)
    return dto
  },
}

export const StageMapper = {
  toEntity(dto: StageDTO): Stage {
    return {
      ...dto,
      id: Number(dto.id),
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      chapters: dto.chapters?.map(ChapterMapper.toEntity) || [],
    }
  },

  toDto(entity: Partial<Stage>): Partial<StageDTO> {
    const dto: Partial<StageDTO> = {
      title: entity.title || '',
    }
    return dto
  },
}

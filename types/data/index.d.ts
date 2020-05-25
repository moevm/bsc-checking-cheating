declare namespace Data {
  type MetaInfo = {
    isCreating?: boolean
    isEditing?: boolean
  }

  type Solution = {
    id: number
    name: string
    group_number: number
    originality: number
  }

  type Student = {
    id: number
    name: string
    subjects: Subject[]
  }

  type Subject = {
    id?: number
    name: string
    isOpened?: boolean
    groups: number[]
    tasks: Task[]
  } & MetaInfo

  type Task = {
    id?: number
    description?: string
    name: string
    subjectId?: number
    originality?: number
    exts?: string[]
    groups?: number[]
    solutions?: Solution[]
  } & MetaInfo

  type Teacher = {
    id: string
    name: string
    subjects: Subject[]
  }
}

export = Data
export as namespace Data

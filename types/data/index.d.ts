declare namespace Data {
  type Difference = {
    reference: DiffObject
    current: DiffObject
  }

  type DiffObject = {
    title: string
    file: string
  }

  type MetaInfo = {
    isCreating?: boolean
    isEditing?: boolean
  }

  type Solution = {
    task_id: number
    student_id: number
    name: string
    group_number: number
    originality: number
    date: string
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
    id: number | string
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

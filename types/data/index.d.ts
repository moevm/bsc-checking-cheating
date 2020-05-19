declare namespace Data {
  type MetaInfo = {
    isCreating?: boolean
    isEditing?: boolean
  }

  type Student = {
    id: number
    name: string
  }

  type Subject = {
    id: number
    name: string
    groups: number[]
    tasks: Task[]
  } & MetaInfo

  type Task = {
    id: number
    name: string
  }

  type Teacher = {
    id: string
    name: string
    subjects: Subject[]
  }
}

export = Data
export as namespace Data

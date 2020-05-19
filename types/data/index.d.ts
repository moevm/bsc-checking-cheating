declare namespace Data {
  type Student = {
    id: number
    name: string
  }

  type Subject = {
    id: number
    name: string
    tasks: Task[]
  }

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

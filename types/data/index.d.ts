declare namespace Data {
  type Admin = {
    groups: Group[]
    students: Student[]
    subjects: Subject[]
    teachers: Teacher[]
  }
  type Difference = {
    reference: DiffObject
    current: DiffObject
  }

  type DiffObject = {
    title: string
    file: string
  }

  type Group = {
    id?: number
    number: string
    created_at?: string
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
    originality: string
    created_at: string
  }

  type Student = {
    id?: number
    name: string
    group_number: string
    subjects?: Subject[]
    created_at?: string
  }

  type Subject = {
    id?: number
    name: string
    isOpened?: boolean
    groups: string[]
    tasks: Task[]
    created_at?: string
  } & MetaInfo

  type Task = {
    id?: number | string
    name?: string
    bound?: number
    check_type?: 'all' | 'subject' | 'task'
    description?: string
    exts?: string[]
    groups?: string[]
    originality?: string
    solutions?: Solution[]
    subject_id?: number
    subjectGroups?: string[]
  } & MetaInfo

  type Teacher = {
    id?: string
    email: string
    name: string
    subjects?: Subject[]
    created_at?: string
  }
}

export = Data
export as namespace Data

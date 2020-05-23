import React, { FC, ChangeEventHandler, useCallback } from 'react'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import Button from 'components/Button'
import Input from 'components/Input'

import S from './styles'

type TOuterProps = {
  data: Data.Task
  isStudent?: boolean
  subjectId: number
}
type TProps = TOuterProps

const SubjectItem: FC<TProps> = ({ data, isStudent, subjectId }) => {
  const { student, teacher } = useStore()

  const onInputChange = useCallback(
    (property: string): ChangeEventHandler<HTMLInputElement> => e => {
      teacher.changeObject(data, property, e.target.value)
    },
    []
  )

  const onOpenModalClick = useCallback(() => {
    student.openModal(data)
  }, [data])

  const onCreateClick = useCallback(() => {
    teacher.createTask(data, subjectId)
  }, [])

  const onSolutionsClick = useCallback(() => {
    teacher.getSolutionsByTask(data)
  }, [data])

  return (
    <S.Item>
      <Input
        value={data.name}
        onChange={onInputChange('name')}
        disabled={!(data.isCreating || data.isEditing)}
      />
      <Input
        value={data.exts.toString()}
        onChange={onInputChange('exts')}
        disabled={!(data.isCreating || data.isEditing)}
      />
      {!isStudent && (
        <Input
          value={data.groups.toString()}
          onChange={onInputChange('groups')}
          disabled={!(data.isCreating || data.isEditing)}
        />
      )}
      {isStudent ? (
        <Button onClick={onOpenModalClick}>Загрузить</Button>
      ) : data.isCreating ? (
        <Button onClick={onCreateClick}>Создать</Button>
      ) : (
        <Button onClick={onSolutionsClick}>Решения</Button>
      )}
      {console.log(data.solutions)}
      {data.originality}
    </S.Item>
  )
}

export default observer(SubjectItem)

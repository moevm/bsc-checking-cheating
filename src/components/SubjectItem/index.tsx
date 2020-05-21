import React, { FC, ChangeEventHandler, useCallback } from 'react'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import Button from 'components/Button'
import Input from 'components/Input'
import TaskItem from 'components/TaskItem'

import S from './styles'

type TOuterProps = {
  data: Data.Subject
  isStudent: boolean
}
type TProps = TOuterProps

const SubjectItem: FC<TProps> = ({ data, isStudent }) => {
  const { teacher } = useStore()

  const onInputChange = useCallback(
    (property: string): ChangeEventHandler<HTMLInputElement> => e => {
      teacher.changeObject(data, property, e.target.value)
    },
    []
  )

  const onCreateClick = useCallback(() => {
    teacher.createSubject(data)
  }, [])

  return (
    <S.Item>
      <S.Container>
        <Input
          value={data.name}
          onChange={onInputChange('name')}
          disabled={!(data.isCreating || data.isEditing)}
        />
        {!isStudent && (
          <Input
            value={data.groups.toString()}
            onChange={onInputChange('groups')}
            disabled={!(data.isCreating || data.isEditing)}
          />
        )}

        {!isStudent &&
          (data.isCreating ? (
            <Button onClick={onCreateClick}>Создать</Button>
          ) : (
            <Button>Сохранено</Button>
          ))}
      </S.Container>

      <S.TasksList>
        {!!data.tasks &&
          data.tasks.map((item, index) => (
            <TaskItem key={index} data={item} subjectId={data.id} isStudent={isStudent} />
          ))}
        {!isStudent && !teacher.taskIsCreating && (
          <li>
            <Button onClick={() => teacher.addDraftTask(data)}>Добавить задание</Button>
          </li>
        )}
      </S.TasksList>
    </S.Item>
  )
}

export default observer(SubjectItem)

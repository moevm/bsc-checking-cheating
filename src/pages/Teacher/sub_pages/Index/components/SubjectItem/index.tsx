import React, { FC, ChangeEventHandler, useCallback } from 'react'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import Button from 'components/Button'
import Input from 'components/Input'
import ItemWithCollapse from 'components/ItemWithCollapse'
import TaskItem from 'components/TaskItem'

import S from './styles'

type TOuterProps = {
  data: Data.Subject
}
type TProps = TOuterProps

const SubjectItem: FC<TProps> = ({ data }) => {
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

  const onRemoveClick = useCallback(() => {
    teacher.removeLocalSubject()
  }, [])

  const onSaveClick = useCallback(() => {
    teacher.updateSubject()
  }, [])

  const onDeleteClick = useCallback(() => {
    teacher.deleteSubject()
  }, [])

  const onCancelClick = useCallback(() => {
    teacher.uneditSubject()
  }, [])

  const onChangeClick = useCallback(() => {
    teacher.editSubject(data)
  }, [])

  return (
    <ItemWithCollapse
      head={
        <>
          <Input
            placeholder="Название"
            value={data.name}
            onChange={onInputChange('name')}
            disabled={!(data.isCreating || data.isEditing)}
          />
          <Input
            placeholder="Группы"
            value={data.groups.toString()}
            onChange={onInputChange('groups')}
            disabled={!(data.isCreating || data.isEditing)}
          />
          {!!data.isCreating && (
            <>
              <S.Button color="success" onClick={onCreateClick}>
                Создать
              </S.Button>
              <S.Button color="secondary" onClick={onRemoveClick}>
                Отменить
              </S.Button>
            </>
          )}
          {!!data.isEditing && (
            <>
              <S.Button color="success" onClick={onSaveClick}>
                Сохранить
              </S.Button>
              <S.Button color="danger" onClick={onDeleteClick}>
                Удалить
              </S.Button>
              <S.Button color="secondary" onClick={onCancelClick}>
                Отменить
              </S.Button>
            </>
          )}
          {teacher.noActiveAction && (
            <Button color="warning" onClick={onChangeClick}>
              Изменить
            </Button>
          )}
        </>
      }
      isOpened={true}
    >
      {!!data.tasks &&
        data.tasks.map((item, index) => <TaskItem key={index} data={item} subjectId={data.id} />)}
    </ItemWithCollapse>
  )
}

export default observer(SubjectItem)

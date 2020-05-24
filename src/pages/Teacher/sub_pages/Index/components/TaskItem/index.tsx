import React, { FC, ChangeEventHandler, useCallback } from 'react'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import Button from 'components/Button'
import Input from 'components/Input'
import Item from 'components/Item'

type TOuterProps = {
  data: Data.Subject
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ data }) => {
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
    <Item>
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
      {/* {data.isCreating ? (
        <Button color="success" onClick={onCreateClick}>
          Создать
        </Button>
      ) : (
        <Button color="success" onClick={onSaveClick}>
          Сохранить
        </Button>
      )} */}
    </Item>
  )
}

export default observer(TaskItem)

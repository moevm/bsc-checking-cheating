import React, { FC, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { observer } from 'mobx-react'

import useStore from 'hooks/useStore'
import S from './styles'

type TOuterProps = {
  data: Data.Task
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ data }) => {
  const { teacher } = useStore()

  const onDeleteClick = useCallback(() => {
    teacher.deleteTask(data)
  }, [teacher.deleteTask])

  return (
    <ListItem disableGutters>
      <S.Link routeName="teacher.task" routeParams={{ id: data.id }}>
        <S.FakeButton button>
          <ListItemText>{data.name}</ListItemText>
        </S.FakeButton>
      </S.Link>
      <Button variant="contained" onClick={onDeleteClick}>
        Удалить
      </Button>
    </ListItem>
  )
}

export default observer(TaskItem)

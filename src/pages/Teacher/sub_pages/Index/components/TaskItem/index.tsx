import React, { FC } from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { observer } from 'mobx-react'

import S from './styles'

type TOuterProps = {
  task: Data.Task
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ task }) => (
  <ListItem disableGutters>
    <S.Link routeName="teacher.task" routeParams={{ id: task.id }}>
      <S.FakeButton button>
        <ListItemText>{task.name}</ListItemText>
        <S.InfoButton color="primary" variant="contained">
          Перейти к задаче
        </S.InfoButton>
      </S.FakeButton>
    </S.Link>
  </ListItem>
)

export default observer(TaskItem)

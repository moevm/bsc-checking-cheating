import React, { FC } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { observer } from 'mobx-react'
import { Link } from 'react-router5'

import S from './styles'

type TOuterProps = {
  data: Data.Task
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ data }) => (
  <S.Link routeName="teacher.task" routeParams={{ id: data.id }}>
    <ListItem button>
      <ListItemText>{data.name}</ListItemText>
    </ListItem>
  </S.Link>
)

export default observer(TaskItem)

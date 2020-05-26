import React, { FC } from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import { observer } from 'mobx-react'

import S from './styles'

type TOuterProps = {
  data: Data.Task
}
type TProps = TOuterProps

const TaskItem: FC<TProps> = ({ data }) => (
  <S.Link routeName="teacher.task" routeParams={{ id: data.id }}>
    <S.Item button>
      <ListItemText>{data.name}</ListItemText>
    </S.Item>
  </S.Link>
)

export default observer(TaskItem)

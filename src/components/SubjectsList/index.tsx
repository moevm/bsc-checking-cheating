import React, { FC, ComponentType } from 'react'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { observer } from 'mobx-react'

import S from './styles'

type TOuterProps = {
  subjects: Data.Subject[]
  TaskItem: ComponentType<{ data: Data.Task }>
  onAddButtonClick?: (subject: Data.Subject) => () => void
  onSubjectItemClick: (subject: Data.Subject) => () => void
}
type TProps = TOuterProps

const SubjectsList: FC<TProps> = ({
  children,
  subjects,
  TaskItem,
  onAddButtonClick,
  onSubjectItemClick
}) => (
  <List subheader={<ListSubheader component="div">Предметы</ListSubheader>}>
    {subjects.map((subject, index) => (
      <S.CustomPaper key={index}>
        <ListItem
          button
          divider={subject.isOpened && !!(subject.tasks.length || onAddButtonClick)}
          onClick={onSubjectItemClick(subject)}
        >
          <ListItemText>{subject.name}</ListItemText>
          {subject.isOpened ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={subject.isOpened}>
          <List>
            {subject.tasks.map((task, index) => (
              <TaskItem key={index} data={task} />
            ))}
            {!!onAddButtonClick && (
              <S.Item button onClick={onAddButtonClick(subject)}>
                <Button color="primary" variant="contained">
                  Добавить задание
                </Button>
              </S.Item>
            )}
          </List>
        </Collapse>
      </S.CustomPaper>
    ))}
  </List>
)

export default observer(SubjectsList)

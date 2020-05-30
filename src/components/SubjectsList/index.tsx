import React, { FC, ComponentType } from 'react'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import { observer } from 'mobx-react'

import S from './styles'

type TOuterProps = {
  subjects: Data.Subject[]
  TaskItem: ComponentType<{ task: Data.Task }>
  onAddButtonClick?: (subject: Data.Subject) => () => void
  onSubjectItemClick: (subject: Data.Subject) => () => void
}
type TProps = TOuterProps

const SubjectsList: FC<TProps> = ({ subjects, TaskItem, onAddButtonClick, onSubjectItemClick }) => {
  const isTeacher = !!onAddButtonClick

  return (
    <List subheader={<ListSubheader component="div">Предметы</ListSubheader>}>
      {subjects.map(subject => {
        const withTasks = !!(subject.tasks && subject.tasks.length)

        return (
          <S.CustomPaper key={subject.id}>
            <ListItem
              button
              divider={subject.isOpened && (withTasks || isTeacher)}
              disabled={!isTeacher && !withTasks}
              onClick={onSubjectItemClick(subject)}
            >
              {subject.isOpened ? <ExpandLess /> : <ExpandMore />}
              <S.SubjectName>{subject.name}</S.SubjectName>
              <S.Groups>
                {isTeacher
                  ? `группы: ${subject.groups.join(', ')}`
                  : withTasks
                  ? ''
                  : 'нет заданий'}
              </S.Groups>
            </ListItem>
            <Collapse in={subject.isOpened}>
              <List>
                {withTasks && subject.tasks.map(task => <TaskItem key={task.id} task={task} />)}
                {isTeacher && (
                  <S.Item button onClick={onAddButtonClick(subject)}>
                    <S.Button color="primary" variant="contained">
                      Добавить задание
                    </S.Button>
                  </S.Item>
                )}
              </List>
            </Collapse>
          </S.CustomPaper>
        )
      })}
    </List>
  )
}

export default observer(SubjectsList)

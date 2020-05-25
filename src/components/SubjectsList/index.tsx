import React, { FC, ComponentType, useCallback } from 'react'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Paper from '@material-ui/core/Paper'
import { observer } from 'mobx-react'

import S from './styles'

type TOuterProps = {
  className?: string
  Item?: ComponentType<{ data: Data.Subject }>
  subjects: Data.Subject[]
  onSubjectItemClick: (subject: Data.Subject) => () => void
}
type TProps = TOuterProps

const SubjectsList: FC<TProps> = ({ className, children, Item, subjects, onSubjectItemClick }) => {
  const onItemClick = useCallback(() => {}, [])

  return (
    <Paper elevation={4}>
      <List subheader={<ListSubheader component="div">Предметы</ListSubheader>}>
        {subjects.map((item, index) => (
          <Box key={index}>
            <ListItem button onClick={onSubjectItemClick(item)}>
              <ListItemText>{item.name}</ListItemText>
              {item.isOpened ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={item.isOpened}>
              <List disablePadding>
                {item.tasks.map((item, index) => (
                  <S.NestedItem key={index} button>
                    <ListItemText>{item.name}</ListItemText>
                  </S.NestedItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Paper>
  )
}

export default observer(SubjectsList)
